import React, {FC} from 'react';

interface ArrowIconProps {
    className?: string,
    onClick?: () => void,
    style?: object
}

const ArrowIcon: FC<ArrowIconProps> = ({className, onClick, style}) => {
    return (
        <svg viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
             className={className} onClick={onClick} style={style}>
            <path
                d="M9.70762 0.199838L0.368806 9.53929C0.235229 9.67273 0.168335 9.82624 0.168335 9.99989C0.168335 10.1736 0.235229 10.3273 0.368806 10.4609L9.70762 19.7995C9.84141 19.9333 9.99492 20 10.1687 20C10.3423 20 10.496 19.9331 10.6295 19.7995L11.6313 18.7977C11.7648 18.6642 11.8316 18.5104 11.8316 18.3368C11.8316 18.1631 11.7648 18.0094 11.6313 17.8758L3.75547 9.99989L11.6318 2.12369C11.7653 1.99018 11.8317 1.83639 11.8317 1.66301C11.8317 1.48907 11.7649 1.33535 11.6318 1.20184L10.6296 0.199909C10.4961 0.066402 10.3423 6.82198e-05 10.1687 6.82274e-05C9.99492 -4.29534e-07 9.8412 0.0663314 9.70762 0.199838Z"/>
        </svg>
    );
};

export default ArrowIcon;