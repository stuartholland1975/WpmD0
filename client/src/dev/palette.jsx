import React from 'react';
import {Category, Component, Palette, Variant,} from '@react-buddy/ide-toolbox';

export const PaletteTree = () => (
    <Palette>
        <Category name="HTML">
            <Component name="a">
                <Variant requiredParams={['href']}>
                    Link
                </Variant>
            </Component>
            <Component name="button">
                <Variant>
                    <button>Button</button>
                </Variant>
            </Component>
        </Category>
    </Palette>
);
