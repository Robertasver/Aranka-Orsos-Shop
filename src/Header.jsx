import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { i18n } = useTranslation();
    const changeLanguage = (e) => i18n.changeLanguage(e.target.value);

    return (
        <header className="fixed top-0 inset-x-0 z-20 bg-black/40 backdrop-blur-sm text-white">
            <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="font-semibold tracking-wide hover:opacity-90">
                    Aranka Orsos
                </Link>

                {/* Nav */}
                <nav className="flex items-center gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-1 rounded ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                        }
                    >
                        Hjem
                    </NavLink>
                    <NavLink
                        to="/kontakt"
                        className={({ isActive }) =>
                            `px-3 py-1 rounded ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                        }
                    >
                        Kontakt
                    </NavLink>

                    {/* Language switcher */}
                    <select
                        onChange={changeLanguage}
                        defaultValue={i18n.language}
                        className="bg-white/20 hover:bg-white/30 text-white text-sm px-2 py-1 rounded outline-none"
                    >
                        <option value="no">NO</option>
                        <option value="en">EN</option>
                        <option value="lt">LT</option>
                        <option value="sk">SK</option>
                        <option value="hu">HU</option>
                    </select>
                </nav>
            </div>
        </header>
    );
}
