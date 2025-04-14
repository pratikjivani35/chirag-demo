import {
  reactExtension,
  BlockLayout,
  InlineLayout,
  View,
  Image,
  Text,
  BlockStack,
  Banner,
  Heading,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const instructions = useInstructions();

  // 2. Check instructions for feature availability
  if (!instructions.attributes.canUpdateAttributes) {
    return (
      <Banner title="icon-text-section" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render UI content
  return (
    <BlockLayout rows={[30, "fill"]}>
      {/* <View padding="none">
        <Heading accessibilityRole="header" inlineAlignment="center" level="1">
          Why Over 270k+ People Love Glamrdip
        </Heading>
      </View>

      {features.map((feature, index) => (
        <InlineLayout
          key={index}
          columns={["15%", "fill"]}
          blockAlignment="center"
        >
          <View padding='extraTight'>
            <Image source={feature.image} />
          </View>
          <View padding="extraTight">
            <BlockStack spacing="extraTight">
              <Heading level="2">{feature.title}</Heading>
              <Text size="small">{feature.description}</Text>
            </BlockStack>
          </View>
        </InlineLayout>
      ))} */}
    </BlockLayout>
  );
}

// 🧱 Feature Content
const features = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0937/4574/2105/files/30_day_money_back_guarantee.png?v=1744259989",
    title: "30 day money back guarantee...",
    description:
      "If for any reason you don't love it, simply return it and we will give you a full refund.",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0937/4574/2105/files/Free_shipping_free_returns_2.png?v=1744259989",
    title: "Free shipping & free returns...",
    description:
      "We offer the choice of free shipping and express shipping. If you need to return your order, we also offer a free return shipping.",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0937/4574/2105/files/1_rated_nail_brand.png?v=1744259989",
    title: "#1 rated nail brand...",
    description:
      "Everyone that tries the GLAMRDIP system agrees that it is a must have. We have invested lots of research & love into our formulas to ensure only the highest quality products.",
  },
];
