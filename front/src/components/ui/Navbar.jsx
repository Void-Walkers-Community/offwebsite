import dayjs from "dayjs";

import { navIcons } from "../../constants/index.js";

const Navbar = () => {
    return (
        <nav>
            <div>
                <p className="font-bold font-MoSignre">Void Walkers</p>
            </div>

            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} alt={`nav-icons-${id}`} className="icon-hover" />
                        </li>
                    ))}
                </ul>

                <time className="font-Outfit">{
                    dayjs().format('ddd MMM D h:mm A')
                }</time>
            </div>
        </nav>
    );
};

export default Navbar;