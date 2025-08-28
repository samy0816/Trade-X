import React from "react";

import {render,screen} from "@testing-library/react";

import '@testing-libary/jest-dom/extend-expect';
import Hero from "../landing_page/home/Hero";

describe('Hero Component', () => {
    test('renders hero section', () => {
        render(<Hero />);
        const heroImage=screen.getByAltText('Hero Image');
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute('src', 'media/images/homeHero.jpg');
    });
});
