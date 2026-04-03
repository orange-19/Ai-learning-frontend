export const createLearningPath = ({
                                       username            = "",
                                       programminglanguage = "",
                                       skilllevel          = "",
                                       diagnosticscore     = 0,
                                       weaktopics          = [],
                                       strongtopics        = [],
                                       totaldays           = 0,
                                       dailyhourstostudy   = 0,
                                       goal                = "",
                                       generatedat         = "",
                                   } = {}) => ({
    username, programminglanguage, skilllevel, diagnosticscore,
    weaktopics, strongtopics, totaldays, dailyhourstostudy, goal, generatedat,
});

export const createDay = ({
                              day            = 0,
                              topic          = "",
                              subtopics      = [],
                              exercise       = "",
                              estimatedhours = 0,
                              focusarea      = "",
                              resources      = [],
                          } = {}) => ({ day, topic, subtopics, exercise, estimatedhours, focusarea, resources });

export const createPathResponse = ({
                                       success      = false,
                                       learningpath = {},
                                       days         = [],
                                   } = {}) => ({
    success,
    learningpath: createLearningPath(learningpath),
    days:         days.map(createDay),
});