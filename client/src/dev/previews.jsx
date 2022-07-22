import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {GridButton} from "../components/grids/components/CellRenderers";
import NavigationDrawer from "../components/navigation/NavigationDrawer";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/GridButton">
                <GridButton/>
            </ComponentPreview>
            <ComponentPreview path="/NavigationDrawer">
                <NavigationDrawer/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;