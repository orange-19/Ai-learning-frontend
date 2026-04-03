export const createAssessment = ({
                                     username            = "",
                                     programminglanguage = "",
                                     difficultylevel     = "",
                                     totalquestions      = 0,
                                     generatedat         = "",
                                 } = {}) => ({ username, programminglanguage, difficultylevel, totalquestions, generatedat });

export const createQuestion = ({
                                   questionno    = 0,
                                   questionid    = 0,
                                   question      = "",
                                   options       = {},
                                   correctoption = "",
                                   correctanswer = "",
                               } = {}) => ({ questionno, questionid, question, options, correctoption, correctanswer });

export const createQuestionResponse = ({
                                           success    = false,
                                           assessment = createAssessment(),
                                           questions  = [],
                                       } = {}) => ({
    success,
    assessment: createAssessment(assessment),
    questions:  questions.map(createQuestion),
});