import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import './editor.scss';
 
export default function Edit( { attributes, setAttributes } ) {
    return (
        <TextControl
            { ...useBlockProps() }
            value={ attributes.message }
            onChange={ ( val ) => setAttributes( { message: val } ) }
        />
    );
    
}