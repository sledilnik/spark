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
                text: 'dryCough'
            },
            {
                text: 'fatigue'
            },
            {
                title: "lessCommonSymptoms"
            },
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
            {
                title: "severeSymptoms"
            },
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
    p: {
        layout: 'inline',
        msgPrefix: 'SPARK-P: ',
        questions: [
            {
                text: 'sparkPQ1'
                textFemine: 'sparkPQ1Femine'
                textMasculine: 'sparkPQ1Masculine'
            },
            {
                text: 'sparkPQ2'
                textFemine: 'sparkPQ2Femine'
                textMasculine: 'sparkPQ2Masculine'
            },
            {
                text: 'sparkPQ3'
                textFemine: 'sparkPQ3Femine'
                textMasculine: 'sparkPQ3Masculine'
            },
        ]
    },
    a: {
		layout: 'inline',
        msgPrefix: 'SPARK-A: ',
		        questions: [
            {
                text: 'sparkAQ1'
                textFemine: 'sparkAQ1Femine'
                textMasculine: 'sparkAQ1Masculine'
            }
        ]
    },
    r: {
		layout: 'inline',
        msgPrefix: 'SPARK-R: ',
        questions: [
            {
                text: 'sparkRQ1'
                textFemine: 'sparkRQ1Femine'
                textMasculine: 'sparkRQ1Masculine'
            },
            {
                text: 'sparkRQ2'
                textFemine: 'sparkRQ2Femine'
                textMasculine: 'sparkRQ2Masculine'
            }
        ]
    },
    n: {
		layout: 'inline',
        msgPrefix: 'SPARK-N: ',
        questions: [
            {
                text: 'sparkNQ1'
            },
            {
                text: 'sparkNQ2'
            }
        ]
    }
}