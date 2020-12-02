const core = require('@actions/core');
const github = require('@actions/github');
import { toUpper, snakeCase, forOwn, map } from 'lodash';

const context = github.context;

/**
 * Get tag of current build.
 * 
 * @throws Error if current build is not tagged
 */
function getTag() {
    const ref = context.ref
    if (!ref)
        throw new Error("GITHUB_REF is not defined")
    if (!ref.startsWith("refs/tags/"))
        throw new Error(`Not a tag ref (${ref})`)
    return ref.replace(/^refs\/tags\//, "")
}

/**
 * Check if current build's PR has given label
 * 
 * @param String label 
 */
function hasLabel(label) {
    return map(context.payload.pull_request.labels, (label) => label.name).includes(label)
}

function stageConfig() {
    return {
        ImageTag: 'latest',
        Build: true,
        ReleaseName: 'spark-stage',
        DeployEnv: 'stagging',
        DeployUrl: 'https://stage.covid-spark.info',
        ChartValuesFile: '.helm/values.stage.yml',
        DeployNamespace: 'spark-stage',
    }
}

function prodConfig() {
    return {
        ImageTag: `pr-${getTag()}`,
        Build: true,
        ReleaseName: 'spark-prod',
        DeployEnv: 'production',
        DeployUrl: 'https://covid-spark.info',
        ChartValuesFile: '.helm/values.prod.yml',
        DeployNamespace: 'spark-prod',
    }
}

/**
 * 
 * Exports all object properties as environment variables (uppercased and camelcased) and as action outputs
 * 
 * @param {*} config 
 */
function setup(config) {
    forOwn(config, (value, key) => {
        const varName = toUpper(snakeCase(key))
        core.info(`Exporting ${varName}=${value}`)
        core.exportVariable(varName, value)
        core.setOutput(key, value)
    });
}

function main() {
    try {
        const event = process.env['GITHUB_EVENT_NAME']
        core.info(`Configuring build environment for event ${event}`)

        if (event === 'push') {
            if (github.context.ref === 'refs/heads/master') {
                setup(stageConfig())
            } else if (github.context.ref.startsWith('refs/tags/')) {
                setup(prodConfig())
            } else {
                core.setFailed('Unknown GitHub event. Supported');
            }
        } else {
            core.setFailed('Unknown GitHub event. Supported: push, pull_request');
        }
    } catch (ex) {
        debug()
        core.setFailed(`Error: ${ex.message}`);
    }
}

main()