import './style.css';

import React, { memo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

export const MarkDownEditor = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {
    console.log(value);
    return (
        <div className="mt-4">
            <label className="text-white">{label}</label>
            <CKEditor
                className={'ahihi'}
                data={value}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    changeValue(prev => ({ ...prev, [name]: data }));
                }}
                onFocus={() => setInvalidFields && setInvalidFields([])}
                config={{
                    toolbar: [
                        'undo',
                        'redo',
                        '|',
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'link',
                        'insertTable',
                        'mediaEmbed',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'indent',
                        'outdent',
                    ],
                    plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo,
                    ],
                }}
            />
            {invalidFields?.some(el => el.name === name) && (
                <span className="text-main text-[12px] font-light">
                    {invalidFields?.find(el => el.name === name).message}
                </span>
            )}
        </div>
    );
};
export default memo(MarkDownEditor);
