import { useState, useEffect } from "react"; // ✅ import useEffect
import {
  Page,
  Layout,
  TextField,
  Text,
  TextContainer,
  Button,
  Form,
  FormLayout,
  DropZone,
  Thumbnail,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AdditionalPage() {
  const shopDomain = "free-ishi-dev.myshopify.com";
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // ✅ state to store fetched image

  // ✅ Fetch image from API on load
  useEffect(() => {
    async function fetchImage() {
      if (!shopDomain) return;

      try {
        const res = await fetch(
          `https://risingsteel.com.au/shopifyapp/image-editor/get_image.php?shop=${shopDomain}`
        );
        const data = await res.json();

        if (data.status === "success" && data.image_url) {
          setUploadedImageUrl(data.image_url);
        } else {
          setUploadedImageUrl("https://placehold.co/600x200?text=No+Image+Found");
        }
      } catch (err) {
        setUploadedImageUrl("https://placehold.co/600x200?text=Error+Loading+Image");
      }
    }

    fetchImage();
  }, [shopDomain]);

  const handleDropZoneDrop = (_dropFiles, acceptedFiles, _rejectedFiles) => {
    setFile(acceptedFiles[0]);
    setError(""); // clear error on new file drop
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("shop_domain", shopDomain);
    formData.append("image", file);

    try {
      const res = await fetch("https://risingsteel.com.au/shopifyapp/image-editor/save_image.php", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setError("");
      } else {
        setSuccess(false);
        setError("Something went wrong while saving the image.");
      }
    } catch (e) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <Page>
      <TitleBar title="Image Upload for Extension" />
      <Layout>
        <Layout.Section>
          <TextContainer spacing="tight">
            <Text variant="headingMd">Upload/Edit Extension Image</Text>
          </TextContainer>

          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="Shop Domain"
                value={shopDomain}
                onChange={shopDomain}
                requiredIndicator
              />

              <DropZone onDrop={handleDropZoneDrop} allowMultiple={false}>
                {file ? (
                  <Thumbnail
                    source={window.URL.createObjectURL(file)}
                    alt="Uploaded image"
                    size="large"
                  />
                ) : (
                  <DropZone.FileUpload />
                )}
              </DropZone>

              {/* ✅ Show uploaded image preview */}
              {uploadedImageUrl && (
                <div style={{ marginTop: "1rem" }}>
                  <Text>Current Image Preview:</Text>
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded"
                    style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc", marginTop: "0.5rem" }}
                  />
                </div>
              )}

              <Button submit primary>Save Image</Button>
            </FormLayout>
          </Form>

          {success && (
            <Banner title="Image Saved!" status="success">
              <p>Your extension image has been uploaded successfully.</p>
            </Banner>
          )}

          {error && (
            <Banner title="Error" status="critical">
              <p>{error}</p>
            </Banner>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
