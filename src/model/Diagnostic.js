export const createDiagnosticRequest = ({
                                            username             = "",
                                            programminglanguage  = "",
                                            days                 = 0,
                                            goal                 = "",
                                            dailyhourstostudy    = 1,
                                            diagnosticquestions  = 5,
                                        } = {}) => ({ username, programminglanguage, days, goal, dailyhourstostudy, diagnosticquestions });