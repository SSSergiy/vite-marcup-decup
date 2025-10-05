import ejsPlugin from "@11ty/eleventy-plugin-ejs";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);

  // Копировать админку Decap CMS
  eleventyConfig.addPassthroughCopy({ "public/admin": "admin" });
  
  // Копировать изображения
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  
  // Копировать шрифты
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    }
  };
}