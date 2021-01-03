const scenarios = {
    s: {
        msgPrefix: 'SPARK-S: ',
        genderSelect: true,
        sections: [
            {
                title: 'mostCommonSymptoms',
                questions: [
                    {
                        text: 'fever',
                    },
                    {
                        text: 'dryCough'
                    },
                    {
                        text: 'fatigue'
                    },
                ]
            },
            {
                title: 'lessCommonSymptoms',
                questions: [
                    {
                        text: 'muscleJointPain'
                    },
                    {
                        text: 'soreThroat'
                    },
                    {
                        text: 'diarrhea'
                    },
                    {
                        text: 'conjunctivitis'
                    },
                    {
                        text: 'headache'
                    },
                    {
                        text: 'lossTasteSmell'
                    },
                    {
                        text: 'skinRash'
                    },
                ]
            },
            {
                title: "severeSymptoms",
                questions: [
                    {
                        text: 'shortBreath'
                    },
                    {
                        text: 'chestPain'
                    },
                    {
                        text: 'lossSpeechMovement'
                    },
                ]
            },

        ]
    },
    p: {
        selectmode: 'single',
        msgPrefix: 'SPARK-P: ',
        genderSelect: true,
        sections: [
            {
                questions: [
                    {
                        text: 'sparkPQ1',
                        textFemine: 'sparkPQ1Femine',
                        textMasculine: 'sparkPQ1Masculine'
                    },
                    {
                        text: 'sparkPQ2',
                        textFemine: 'sparkPQ2Femine',
                        textMasculine: 'sparkPQ2Masculine'
                    },
                    {
                        text: 'sparkPQ3',
                        textFemine: 'sparkPQ3Femine',
                        textMasculine: 'sparkPQ3Masculine'
                    },
                ]
            }
        ]
    },
    a: {
        msgPrefix: 'SPARK-A: ',
        genderSelect: true,
        sections: [
            {
                questions: [
                    {
                        text: 'sparkAQ1',
                        textFemine: 'sparkAQ1Femine',
                        textMasculine: 'sparkAQ1Masculine'
                    }
                ]
            }
        ]
    },
    r: {
        msgPrefix: 'SPARK-R: ',
        genderSelect: true,
        sections: [
            {
                questions: [
                    {
                        text: 'sparkRQ1',
                        textFemine: 'sparkRQ1Femine',
                        textMasculine: 'sparkRQ1Masculine'
                    },
                    {
                        text: 'sparkRQ2',
                        textFemine: 'sparkRQ2Femine',
                        textMasculine: 'sparkRQ2Masculine'
                    }
                ]
            }
        ]

    },
    n: {
        msgPrefix: 'SPARK-N: ',
        genderSelect: true,
        questions: [
            {
                text: 'sparkNQ1'
            },
            {
                text: 'sparkNQ2'
            }
        ]
    },
    share: {
        msg: 'shareSMS',
        genderSelect: false,
    }
}