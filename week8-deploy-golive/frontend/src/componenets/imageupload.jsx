import { useState } from 'react';

function ImageUpload({ onImageSelect, currentImage }) {
    const [preview, setPreview] = useState(currentImage || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onImageSelect(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    style={{ width: '200px', marginTop: '10px' }}
                />
            )}
        </div>
    );
}

export default ImageUpload;