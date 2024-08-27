import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import styles from './CustomTextEditor.module.scss'

const CustomTextEditor = ({ value, onChange } ) => {
    const handleChange = (content, delta, source, editor) => {
        onChange(editor.getHTML())
    }

    return (
        <div className={styles.texteditor}>
          <CustomToolbar />
          <ReactQuill
            value={value}
            onChange={handleChange}
            placeholder='Write something...'
            modules={CustomTextEditor.modules}
            formats={CustomTextEditor.formats}
            theme={"snow"} // pass false to use minimal theme
          />
        </div>
      );
  }

  CustomTextEditor.modules = {
    toolbar: "#toolbar",
  };

  CustomTextEditor.formats = [
    "header",
    "bold",
    "italic",
    "color",
  ];
  
export default CustomTextEditor;