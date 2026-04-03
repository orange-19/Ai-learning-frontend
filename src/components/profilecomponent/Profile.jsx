import { useUser } from "../../context/UserContext";
import { useState } from "react";

export default function ProfileCard() {
    const { user, loading, error } = useUser();  // fix: {} not []
    const [open, setOpen] = useState(false);

    const initials = user.name
        ?.split(" ")
        .map(w => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <>
            <button onClick={() => setOpen(o => !o)} className="avatar-btn">
                {user.avatarUrl
                    ? <img src={user.avatarUrl} alt="avatar" />
                    : initials}
            </button>

            {open && (
                <div className="profile-panel">
                    <button onClick={() => setOpen(false)}>✕</button>

                    {loading && <p>Loading...</p>}
                    {error   && <p>{error}</p>}

                    {!loading && !error && (
                        <>
                            <div className="avatar-circle">{initials}</div>
                            <p className="name">{user.name}</p>
                            <p className="username">@{user.username}</p>
                            <hr />
                            <div>Roll no: {user.rollno}</div>
                            <div>Email: {user.email}</div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}