import { defineStaticConfig, wrapFieldsWithMeta } from "tinacms";
import { contentBlockSchema } from "../components/blocks/content";
// import { featureBlockSchema } from "../components/blocks/features";
import { embedBlockSchema } from "../components/blocks/embed";
import { heroBlockSchema } from "../components/blocks/hero";
import { testimonialBlockSchema } from "../components/blocks/testimonial";
import { iconSchema } from "../components/util/icon";
import { colorOptions } from "../components/util/options";

const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "post",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/post/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "heroImg",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            label: "Excerpt",
            name: "excerpt",
          },
          {
            type: "reference",
            label: "Author",
            name: "author",
            collections: ["author"],
          },
          {
            type: "datetime",
            label: "Posted Date",
            name: "date",
            ui: {
              dateFormat: "MMMM DD YYYY",
              timeFormat: "hh:mm A",
            },
          },
          {
            type: "rich-text",
            label: "Body",
            name: "_body",
            templates: [
              {
                name: "DateTime",
                label: "Date & Time",
                inline: true,
                fields: [
                  {
                    name: "format",
                    label: "Format",
                    type: "string",
                    options: ["utc", "iso", "local"],
                  },
                ],
              },
              {
                name: "BlockQuote",
                label: "Block Quote",
                fields: [
                  {
                    name: "children",
                    label: "Quote",
                    type: "rich-text",
                  },
                  {
                    name: "authorName",
                    label: "Author",
                    type: "string",
                  },
                ],
              },
              {
                name: "NewsletterSignup",
                label: "Newsletter Sign Up",
                fields: [
                  {
                    name: "children",
                    label: "CTA",
                    type: "rich-text",
                  },
                  {
                    name: "placeholder",
                    label: "Placeholder",
                    type: "string",
                  },
                  {
                    name: "buttonText",
                    label: "Button Text",
                    type: "string",
                  },
                  {
                    name: "disclaimer",
                    label: "Disclaimer",
                    type: "rich-text",
                  },
                ],
                ui: {
                  defaultItem: {
                    placeholder: "Enter your email",
                    buttonText: "Notify Me",
                  },
                },
              },
            ],
            isBody: true,
          },
        ],
      },
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "string",
            label: "Site Url",
            name: "siteUrl",
          },
          {
            type: "string",
            label: "Google Tag Manager ID",
            name: "gtmId",
          },
          {
            type: "image",
            label: "Favicon",
            name: "favicon",
            description: "Should be a 48x48px png",
          },
          {
            type: "string",
            label: "Desktop Width",
            name: "desktopWidth",
          },
          {
            type: "string",
            label: "Background Color",
            name: "backgroundColor",
            ui: {
              component: "colorControl",
            },
            options: colorOptions,
          },
          {
            label: "",
            name: "rule",
            type: "string",
            ui: {
              component: "ruledTitle",
            },
          },

          {
            type: "object",
            label: "Colors",
            name: "colors",
            fields: [
              {
                type: "string",
                label: "Primary",
                name: "primary",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Accent 1",
                name: "accent1",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Accent 2",
                name: "accent2",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Accent 3",
                name: "accent3",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Accent 4",
                name: "accent4",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "White",
                name: "white",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Gray Light",
                name: "grayLight",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Gray",
                name: "gray",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Gray Dark",
                name: "grayDark",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Black",
                name: "black",
                ui: {
                  component: "color",
                },
              },
            ]
          },
          {
            type: "object",
            label: "Header",
            name: "header",
            fields: [
              iconSchema,
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" },
                ],
              },
              {
                type: "object",
                label: "Nav Links",
                name: "nav",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                  defaultItem: {
                    href: "home",
                    label: "Home",
                  },
                },
                fields: [
                  {
                    type: "string",
                    label: "Link",
                    name: "href",
                  },
                  {
                    type: "string",
                    label: "Label",
                    name: "label",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            fields: [
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" },
                ],
              },
              {
                type: "object",
                label: "Social Links",
                name: "social",
                fields: [
                  {
                    type: "string",
                    label: "Facebook",
                    name: "facebook",
                  },
                  {
                    type: "string",
                    label: "Twitter",
                    name: "twitter",
                  },
                  {
                    type: "string",
                    label: "Instagram",
                    name: "instagram",
                  },
                  {
                    type: "string",
                    label: "Github",
                    name: "github",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Theme",
            name: "theme",
            fields: [
              {
                type: "string",
                label: "Primary Color",
                name: "color",
                options: [
                  {
                    label: "Blue",
                    value: "blue",
                  },
                  {
                    label: "Teal",
                    value: "teal",
                  },
                  {
                    label: "Green",
                    value: "green",
                  },
                  {
                    label: "Red",
                    value: "red",
                  },
                  {
                    label: "Pink",
                    value: "pink",
                  },
                  {
                    label: "Purple",
                    value: "purple",
                  },
                  {
                    label: "Orange",
                    value: "orange",
                  },
                  {
                    label: "Yellow",
                    value: "yellow",
                  },
                ],
              },
              {
                type: "string",
                name: "font",
                label: "Font Family",
                options: [
                  {
                    label: "System Sans",
                    value: "sans",
                  },
                  {
                    label: "Nunito",
                    value: "nunito",
                  },
                  {
                    label: "Lato",
                    value: "lato",
                  },
                ],
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Set",
                options: [
                  {
                    label: "Boxicons",
                    value: "boxicon",
                  },
                  {
                    label: "Heroicons",
                    value: "heroicon",
                  },
                ],
              },
              {
                type: "string",
                name: "darkMode",
                label: "Dark Mode",
                options: [
                  {
                    label: "System",
                    value: "system",
                  },
                  {
                    label: "Light",
                    value: "light",
                  },
                  {
                    label: "Dark",
                    value: "dark",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Authors",
        name: "author",
        path: "content/authors",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Avatar",
            name: "avatar",
          },
        ],
      },
      {
        label: "Pages",
        name: "page",
        path: "content/pages",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            if (document._sys.filename === "about") {
              return `/about`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              embedBlockSchema,
              heroBlockSchema,
              // featureBlockSchema,
              contentBlockSchema,
              testimonialBlockSchema,
            ],
          },
        ],
      },
    ],
  },
  cmsCallback: (cms) => {
    import("../plugins").then(({ SectionListItemsPlugin }) => {
      cms.plugins.add(SectionListItemsPlugin);
    });
    import("../plugins").then(({ itemListFieldPlugin }) => {
      cms.plugins.add(itemListFieldPlugin);
    });
    import("../plugins").then(({ emailFieldPlugin }) => {
      cms.plugins.add(emailFieldPlugin);
    });
    import("../plugins").then(({ typeControlFieldPlugin }) => {
      cms.plugins.add(typeControlFieldPlugin);
    });
    import("../plugins").then(({ typeSizeControlFieldPlugin }) => {
      cms.plugins.add(typeSizeControlFieldPlugin);
    });
    import("../plugins").then(({ colorControlFieldPlugin }) => {
      cms.plugins.add(colorControlFieldPlugin);
    });
    import("../plugins").then(({ fillControlFieldPlugin }) => {
      cms.plugins.add(fillControlFieldPlugin);
    });
    import("../plugins").then(({ alignmentControlFieldPlugin }) => {
      cms.plugins.add(alignmentControlFieldPlugin);
    });
    import("../plugins").then(({ imageControlFieldPlugin }) => {
      cms.plugins.add(imageControlFieldPlugin);
    });
    import("../plugins").then(({ paddingControlFieldPlugin }) => {
      cms.plugins.add(paddingControlFieldPlugin);
    });
    import("../plugins").then(({ borderControlFieldPlugin }) => {
      cms.plugins.add(borderControlFieldPlugin);
    });
    import("../plugins").then(({ selectFieldPlugin }) => {
      cms.plugins.add(selectFieldPlugin);
    });
    import("../plugins").then(({ featureContentControlPlugin }) => {
      cms.plugins.add(featureContentControlPlugin);
    });
    import("../plugins").then(({ featureImageControlPlugin }) => {
      cms.plugins.add(featureImageControlPlugin);
    });
    import("../plugins").then(({ ruledTitlePlugin }) => {
      cms.plugins.add(ruledTitlePlugin);
    });
    
    return cms
  }
});

export default config;
