import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const quillRef = useRef(null); // Create a local ref for Quill instance

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current; // Get the container reference
      const quill = new Quill(container, { // Initialize Quill here
        theme: 'snow',
      });
      quillRef.current = quill; // Store the Quill instance in local ref

      ref.current = quill; // Assign the Quill instance to the forwarded ref

      // Set default content if available
      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      // Event listeners
      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = ''; // Cleanup
      };
    }, [ref]); // Make sure it only runs once when the component mounts

    return <div ref={containerRef} style={{ height: '300px' }}></div>; // Ensure the container has height
  },
);

Editor.displayName = 'Editor';

export default Editor;
