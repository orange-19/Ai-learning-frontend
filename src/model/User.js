const creatUser = ({
                       username  = "",
                       name      = "",
                       rollno    = "",
                       email     = "",
                       avatarUrl = "",   // fix: camelCase to match Java ProfileDto
                   } = {}) => ({ username, name, rollno, email, avatarUrl });

export default creatUser;