// ref: IBM/carbon https://github.com/carbon-design-system/carbon/tree/main/packages/icons

import { usePreferences } from "../context/preferences";

const fitToWidthIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="currentColor" d="m22 11l-1.41 1.41L23.17 15H8.83l2.58-2.59L10 11l-5 5l5 5l1.41-1.41L8.83 17h14.34l-2.58 2.59L22 21l5-5z"></path><path fill="currentColor" d="M28 30H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2M4 4v24h24V4Z"></path></svg>
const fittoHeightIcon = <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="currentColor" d="m11 10l1.41 1.41L15 8.83v14.34l-2.59-2.58L11 22l5 5l5-5l-1.41-1.41L17 23.17V8.83l2.59 2.58L21 10l-5-5z"></path><path fill="currentColor" d="M28 30H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2M4 4v24h24V4Z"></path></svg>

export default function PageFitButton() {
    const { preferences, updatePreferences } = usePreferences();
    const icon = preferences.fitTo === 'width' ? fitToWidthIcon : fittoHeightIcon;
    const toggleFitTo = () => {
        updatePreferences({ fitTo: preferences.fitTo === 'width' ? 'height' : 'width' });
    };
    return <div><button className="portrait:hidden" onClick={toggleFitTo}>{icon}</button></div>
}