# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.154.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# install hugo
RUN curl -L -o /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.79.1/hugo_extended_0.79.1_Linux-64bit.deb \
    && dpkg -i /tmp/hugo.deb \
    && rm /tmp/hugo.deb

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN sudo -u node npm install -g <your-package-list-here>
