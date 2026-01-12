//custom button component with different modifiable styles

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
    //children is an optional reserved keyword from extending React.ButtonHTMLAttributes 
    children, //gives the button the ability to have children by giving it its own opening and closing tag (instead of self-closing)
    size = 'md',
    className = '', 
    variant = 'primary', //default value if empty
    ...props //for other props passed that aren't defined above (onClick, id, disabled, etc) are spread into this object
}) => {

    //base styles always applied
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    //object containing variant styles
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    }

    //object containing various sizes
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (

        //button structure/design
        //if variant = primary and you look for variants[variant], variants[variant] becomes variant.primary
        //external className (keyword) is different from internal className (ButtonProp)
        <button className = {`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}{...props}>
            {children}
        </button>
    );
}