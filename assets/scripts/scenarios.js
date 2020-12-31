const scenarios = {
    s: {
        layout: 'tabular',
        msgPrefix: 'SPARK-S: ',
        questions: [
            {
                title: 'mostCommonSymptoms',
            },
            {
                text: 'fever',
            },
            {
                text: 'Suh kašelj'
            },
            {
                text: 'Utrujenost'
            },
            {
                title: "Manj pogosti simptomi"
            },
            {
                text: 'Bolečine v mišicah/sklepih'
            },
            {
                text: 'Boleče žrelo'
            },
            {
                text: 'Konjunktivitis'
            },
            {
                text: 'Glavobol'
            },
            {
                text: 'Izguba okusa/vonja'
            },
            {
                text: 'Srbečica/razbarvanost prstov'
            },
            {
                title: "Resni simptomi"
            },
            {
                text: 'Težave pri dihanju/izguba sape'
            },
            {
                text: 'Bolečina/pritisk v prsih'
            },
            {
                text: 'Izguba zmožnosti govora/premikanja'
            },
        ]
    },
    p: {
        layout: 'inline',
        msgPrefix: 'SPARK-P: ',
        questions: [
            {
                text: 'Prvi simptom sem imel/a <date-picker> , kužen/kužna pa bi lahko bil/a že 2 dneva prej.'
            },
            {
                text: 'Nimam simptomov, a mislim, da sem se okužil/a <date-picker> , 3 dni po tem pa bi lahko bil/a kužen/kužna.'
            },
            {
                text: 'Nimam simptomov in ne vem, kdaj sem se okužil/a. (Če boš naknadno zaznal/a simptome, to sporoči svojim kontaktom s »Spark S, covid-spark.info« .)'
            },
        ]

    },
    a: {
        msgPrefix: 'SPARK-A: ',
        layout: 'inline',
    },
    r: {
        msgPrefix: 'SPARK-R: ',
        layout: 'inline',
    },
    n: {
        msgPrefix: 'SPARK-N: ',
        layout: 'inline',
    }
}