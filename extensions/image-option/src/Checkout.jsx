import {
  reactExtension,
  Banner,
  Text,
  Heading,
  BlockStack,
  Image,
  useApi,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

import { useEffect, useState } from "react";

// 1. Choose an extension target
export default reactExtension(
  "purchase.checkout.block.render", 
  () => <Extension />
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const {shop} = useApi();
  const instructions = useInstructions();

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const shopDomain = shop.myshopifyDomain;

      if (!shopDomain) return;

      try {
        const res = await fetch(
          `https://risingsteel.com.au/shopifyapp/image-editor/get_image.php?shop=${shopDomain}`
        );

        console.log("res === ", res);
        
        const data = await res.json();

        if (data.status === "success" && data.image_url) {
          setImageUrl(data.image_url);
        } else {
          // fallback image
          setImageUrl("https://placehold.co/1400x200?text=No+Image&font=poppins");
        }
      } catch (err) {
        console.error("Failed to fetch image:", err);
        setImageUrl("https://placehold.co/1400x200?text=Error+Loading+Image&font=poppins");
      }
    }

    fetchImage();
  }, [extension.shop?.domain]);


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="Image-Option" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render a UI
  return (
    <BlockStack>
      <Text>This is the Text..... {shop.myshopifyDomain}</Text>
      
      {imageUrl && <Heading accessibilityRole="header">{imageUrl}</Heading>}

      <Image source="https://cdn.shopify.com/s/files/1/0937/4574/2105/files/Happy_Customer.png?v=1744190687" />
    </BlockStack>
  );
}