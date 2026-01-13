import { lazy } from 'react';

// --- LAYOUTS ---
import { Section, Grid, Tabs, Wizard, Split } from '@shared/layouts';

// --- STANDARD FIELDS ---
import { TextInputField } from '@ui/fields';
import { TextareaField } from '@ui/fields';
import { SelectField } from '@ui/fields';
import { ToggleField } from '@ui/fields';
import { CheckboxField } from '@ui/fields';
import { RadioField } from '@ui/fields';
import { SliderField } from '@ui/fields';

// --- COMPLEX FIELDS ---
import { RepeaterField } from '@ui/fields';
import { MediaInputField } from '@ui/fields';
import { DataTable } from '@composite/DataTable';
import GenericPage from '@composite/GenericPage';

const StatCard = lazy(() => 
    import('@shared/widgets/StatCard').then(module => ({ default: module.StatCard }))
);
const ChartCard = lazy(() => 
    import('@shared/widgets/ChartCard').then(module => ({ default: module.ChartCard }))
);
const MapCard = lazy(() => 
    import('@shared/widgets/MapCard').then(module => ({ default: module.MapCard }))
);
const RichTextField = lazy(() => 
    import('@ui/fields/RichTextField').then(module => ({ default: module.RichTextField }))
);

/**
 * Mapping des types provenant du Backend Laravel vers les composants React
 */
export const COMPONENT_MAP = {
    // Dispositions
    'section': Section,
    'grid': Grid,
    'tabs': Tabs,
    'wizard': Wizard,
    'split': Split,

    // Champs de saisie
    'text_input': TextInputField,
    'textarea': TextareaField,
    'select': SelectField,
    'switch': ToggleField,
    'checkbox': CheckboxField,
    'radio_group': RadioField,
    'slider': SliderField,

    // Composants riches
    'repeater': RepeaterField,
    'rich_text': RichTextField,
    'media_input': MediaInputField,

    'data_table': DataTable,

    'stat_card': StatCard,
    'chart_card': ChartCard,
    'map_card': MapCard,
    'generic_page': GenericPage,
};