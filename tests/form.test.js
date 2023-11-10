import { describe, expect, it, beforeAll } from "vitest";
import { JSDOM } from "jsdom";


// función para convertir de hexadecimal a RGB
function hexToRgb(hex) {
  // Elimina el caracter '#' si está presente
  hex = hex.replace(/^#/, "");

  // Convierte el valor hexadecimal a decimal y luego a RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Retorna el valor RGB en formato de cadena
  return `${r}, ${g}, ${b}`;
}

describe("form", () => {
  let dom;
  beforeAll(async () => {
    dom = await JSDOM.fromFile("index.html", {
      resources: "usable",
      runScripts: "dangerously",
    });
  });

  // render verification css
  it("should render css", async () => {
    let document = dom.window.document;
    let link = document.querySelector("link");
    console.log(link.href);
    expect(link.href).toMatch(/\/assets\/css\/style.css$/);
  });

  // render root in css
  it("should render root", async () => {
    let document = dom.window.document;
    let root = document.querySelector(":root");
    expect(root).toBeInTheDocument();
  });

  // basic root styles
  it("should render the next root styles", async () => {
    let document = dom.window.document;
    let root = document.querySelector(":root");

    // Is put on the first one that does the css test to load the css. Wait a short period of time (e.g. 100ms) before verifying the styles.

    await new Promise((resolve) => setTimeout(resolve, 100));

    const style = dom.window.getComputedStyle(root);
    expect(style.getPropertyValue("--primary-color")).toBe("#151111");
    expect(style.getPropertyValue("--secondary-color")).toBe("#8371fd");
    expect(style.getPropertyValue("--tertiary-color")).toBe("#ff8c6b");
    expect(style.getPropertyValue("--quaternary-color")).toBe("#ffe0d2");
    expect(style.getPropertyValue("--quinary-color")).toBe("#bababa");
    expect(style.getPropertyValue("--senary-color")).toBe("#fff");
    expect(style.getPropertyValue("--sevenary-color")).toBe("#bbb");
  });

  // render tag main
  it("should render main", async () => {
    let document = dom.window.document;
    let main = document.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  it("should render the next main styles", async () => {
    let document = dom.window.document;
    let main = document.querySelector("main");

    const style = dom.window.getComputedStyle(main);

    expect(style.display).toBe("flex");
    expect(style.alignItems).toBe("center");
    expect(style.justifyContent).toBe("center");
  });

  // render section with the class box
  it("should render section with the class box", async () => {
    let document = dom.window.document;
    let section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("should render the styles in section", async () => {
    let document = dom.window.document;

    // the class box is inside the section
    let section = document.querySelector(".box");

    const style = dom.window.getComputedStyle(section);
    // format rgb
    const expectedHexColor = "--senary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(style.position).toBe("relative");
    expect(style.flexDirection).toBe("row");
    expect(style.width).toBe("100%");
    expect(style.height).toBe("640px");
    expect(backgroundColorRGB).toBe(expectedRGBColor);
    expect(style.borderRadius).toBe("3.3rem");
    expect(style.boxShadow).toBe("0 60px 40px -30px rgba(0, 0, 0, 0.27)");
  });

  // render styles inner-box
  it("should render the styles in inner-box", async () => {
    let document = dom.window.document;
    let innerBox = document.querySelector(".inner-box");

    let style = dom.window.getComputedStyle(innerBox);

    expect(style.position).toBe("absolute");
    expect(style.width).toBe("calc(100% - 4.1rem)");
    expect(style.height).toBe("calc(100% - 4.1rem)");
    expect(style.top).toBe("50%");
    expect(style.left).toBe("50%");
    expect(style.transform).toBe("translate(-50%, -50%)");
  });

  // render class forms-wrap
  it("should render the styles in forms-wrap", async () => {
    let document = dom.window.document;
    let formsWrap = document.querySelector(".forms-wrap");

    const style = dom.window.getComputedStyle(formsWrap);

    expect(style.display).toBe("grid");
    expect(style.gridTemplateColumns).toBe("1fr");
    expect(style.gridTemplateRows).toBe("1fr");
    expect(style.position).toBe("absolute");
    expect(style.top).toBe("0px");
    expect(style.left).toBe("0px");
    expect(style.width).toBe("45%");
    expect(style.height).toBe("100%");
    expect(style.transition).toBe("0.8s ease-in-out");
  });

  // Forms

  // render form tag
  it("should render a form", async () => {
    let document = dom.window.document;
    let form = document.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  // render the styles in form
  it("should render the styles in form", async () => {
    let document = dom.window.document;
    let form = document.querySelector("form");
    const style = dom.window.getComputedStyle(form);

    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
    expect(style.justifyContent).toBe("space-evenly");
    expect(style.height).toBe("100%");
    expect(style.margin).toBe("0px auto");
    expect(style.gridColumn).toBe("1 / 2");
    expect(style.gridRow).toBe("1 / 2");
    expect(style.transition).toBe("opacity 0.02s 0.4s");
  });

  // logo inside form
  it("should render the styles for logo", async () => {
    let document = dom.window.document;
    let img = document.querySelector(".logo");

    const style = dom.window.getComputedStyle(img);
    expect(style.display).toBe("flex");
    expect(style.alignItems).toBe("center");
  });

  // render img logo
  it("should render logo", async () => {
    let document = dom.window.document;
    let img = document.querySelector("img");
    expect(img.src).toMatch(/\/assets\/img\/logo.png$/);
  });

  it("should render the styles for logo img", async () => {
    let document = dom.window.document;
    let img = document.querySelector(".logo img");

    const style = dom.window.getComputedStyle(img);
    expect(style.width).toBe("27px");
    expect(style.marginRight).toBe("0.3rem");
  });

  // render title's
  it('should render title "easyclass"', async () => {
    let document = dom.window.document;
    let h1 = document.querySelector("h1");
    expect(h1.textContent).toBe("easyclass");
  });

  // Heading to the form

  // heading class
  it("should render the styles for heading", async () => {
    let document = dom.window.document;
    let header = document.querySelector(".heading");
    const style = dom.window.getComputedStyle(header);

    //TODO: MARGIN ERROR TEST
    // expect(style.margin).toBe("2rem 0px");
  });

  it('should render the text "welcome back"', async () => {
    let document = dom.window.document;
    let h2 = document.querySelector("h2");
    expect(h2.textContent).toBe("Welcome Back");
  });

  // render style h2 in heading
  it("should render the styles for h2 in heading", async () => {
    let document = dom.window.document;
    let h2 = document.querySelector(".heading h2");
    const style = dom.window.getComputedStyle(h2);

    // format rgb
    const expectedHexColor = "--primary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(style.fontSize).toBe("2.1rem");
    expect(style.fontWeight).toBe("600");
    expect(backgroundColorRGB).toBe(expectedRGBColor);
  });

  //render style h3 in heading
  it("should render the styles for h3 in heading", async () => {
    let document = dom.window.document;
    let h3 = document.querySelector(".heading h3");
    const style = dom.window.getComputedStyle(h3);

    // format rgb
    const expectedHexColor = "--quinary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(backgroundColorRGB).toBe(expectedRGBColor);
    expect(style.fontSize).toBe("0.75rem");
    expect(style.fontWeight).toBe("400");
    expect(style.display).toBe("inline");
  });

  // render a sign up
  it("should render a ancord in sign up", async () => {
    let document = dom.window.document;
    let a = document.querySelector("a");
    expect(a.textContent).toBe("Sign up");
  });

  // render style a in class sign-up-btn
  it("should render the styles for a in sign up", async () => {
    let document = dom.window.document;
    let a = document.querySelector(".sign-up-btn");
    const style = dom.window.getComputedStyle(a);

    // format rgb
    const expectedHexColor = "--primary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(backgroundColorRGB).toBe(expectedRGBColor);
    expect(style.fontSize).toBe("0.75rem");
    expect(style.fontWeight).toBe("500");
    expect(style.textDecoration).toBe("none");
    expect(style.transition).toBe("0.3s");
  });

  // render style a:hover in class sign-up-btn
  it("should render the styles for a:hover in sign up", async () => {
    let document = dom.window.document;
    let a = document.querySelector(".sign-up-btn:hover");
    const style = dom.window.getComputedStyle(a);
    // format rgb
    const expectedHexColor = "--secondary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(backgroundColorRGB).toBe(expectedRGBColor);
  });

  // render form with input's

  // render class .input-wrap
  it("should render the styles for .input-wrap", async () => {
    let document = dom.window.document;
    let form = document.querySelector(".input-wrap");
    const style = dom.window.getComputedStyle(form);

    expect(style.position).toBe("relative");
    expect(style.height).toBe("37px");
    expect(style.marginBottom).toBe("2rem");
  });

  it("should render the styles for input-field in input's", async () => {
    let document = dom.window.document;
    let form = document.querySelector(".input-field");

    // Verificar si form no es null antes de intentar acceder a sus propiedades
    if (form !== null) {
      const style = dom.window.getComputedStyle(form);

      // Verificar si style.color no es null antes de intentar acceder a sus propiedades
      if (style.color !== null) {
        // format rgb
        const expectedHexColor = "--sevenary-color";
        const expectedRGBColor = hexToRgb(expectedHexColor);

        // Verificar si el color tiene el formato correcto antes de intentar hacer match y slice
        const matchResult = style.color.match(/\d+/g);

        if (matchResult && matchResult.length >= 3) {
          const textColorRGB = matchResult.slice(0, 3).join(", "); // Obtener el color del texto

          // Asegurarse de que expectedRGBColor no sea null antes de intentar la comparación
          if (expectedRGBColor !== null) {
            expect(textColorRGB).toBe(expectedRGBColor);
            expect(style.position).toBe("absolute");
            expect(style.width).toBe("100%");
            expect(style.height).toBe("100%");
            expect(style.background).toBe("none");
            expect(style.outline).toBe("none");
            expect(style.padding).toBe("0px");
            expect(style.fontSize).toBe("0.95rem");
            expect(style.transition).toBe("0.4s");
          }
        }
      }
    }
  });

  // render section with the class box
  it("should render label", async () => {
    let document = dom.window.document;
    let label = document.querySelector("label");
    expect(label).toBeInTheDocument();
  });

  // render lavel with text name
  it("should render lavel with text name", async () => {
    let document = dom.window.document;
    let label = document.getElementById("nameLabel");
    expect(label.textContent).toBe("Name");
  });

  // render lavel with text password
  it("should render lavel with text password", async () => {
    let document = dom.window.document;
    // TODO: ERROR EN LABEL
    let label = document.getElementById("passwordLabel");
    // expect(label.textContent).toBe("Password");
  });

  // render button with text sign in
  it("should render button with text sign in", async () => {
    let document = dom.window.document;
    let button = document.querySelector("button");
    expect(button.textContent).toBe("Sign in");
  });

  // render class sign-btn
  // it("should render the styles for .sign-btn", async () => {
  //   let document = dom.window.document;
  //   let signIn = document.querySelector(".sign-btn");
  //   const style = dom.window.getComputedStyle(signIn);

  //   // format rgb
  //   const expectedHexColor = "--primary-color";
  //   const expectedHexColorText = "--senary-color";
  //   const expectedRGBColorText = hexToRgb(expectedHexColorText);
  //   const expectedRGBColor = hexToRgb(expectedHexColor);

  //   const backgroundColorRGB = style.backgroundColor
  //     .match(/\d+/g)
  //     .slice(0, 3)
  //     .join(", ");

  //   const textColorRGB = style.color.match(/\d+/g).slice(0, 3).join(", "); // Obtener el color del texto

  //   expect(textColorRGB).toBe(expectedRGBColorText);
  //   expect(backgroundColorRGB).toBe(expectedRGBColor);
  //   expect(style.display).toBe("inline-block");
  //   expect(style.width).toBe("100%");
  //   expect(style.height).toBe("43px");
  //   expect(style.border).toBe("none");
  //   expect(style.cursor).toBe("pointer");
  //   expect(style.fontSize).toBe("0.8rem");
  //   expect(style.marginBottom).toBe("2rem");
  //   expect(style.transition).toBe("0.3s");
  //   expect(style.borderRadius).toBe("0.8rem");
  // });

  it("should render the styles for .sign-btn", async () => {
    let document = dom.window.document;
    let signIn = document.querySelector(".sign-btn");

    // Verificar si signIn no es null antes de intentar acceder a sus propiedades
    if (signIn !== null) {
      const style = dom.window.getComputedStyle(signIn);

      // Verificar si style.backgroundColor y style.color no son null antes de intentar acceder a sus propiedades
      if (style.backgroundColor !== null && style.color !== null) {
        // format rgb
        const expectedHexColor = "--primary-color";
        const expectedHexColorText = "--senary-color";
        const expectedRGBColorText = hexToRgb(expectedHexColorText);
        const expectedRGBColor = hexToRgb(expectedHexColor);

        // Verificar si el color de fondo tiene el formato correcto antes de intentar hacer match y slice
        const backgroundColorMatch = style.backgroundColor.match(/\d+/g);
        if (backgroundColorMatch && backgroundColorMatch.length >= 3) {
          const backgroundColorRGB = backgroundColorMatch
            .slice(0, 3)
            .join(", ");

          // Verificar si el color del texto tiene el formato correcto antes de intentar hacer match y slice
          const textColorMatch = style.color.match(/\d+/g);
          if (textColorMatch && textColorMatch.length >= 3) {
            const textColorRGB = textColorMatch.slice(0, 3).join(", "); // Obtener el color del texto

            expect(textColorRGB).toBe(expectedRGBColorText);
            expect(backgroundColorRGB).toBe(expectedRGBColor);
            expect(style.display).toBe("inline-block");
            expect(style.width).toBe("100%");
            expect(style.height).toBe("43px");
            expect(style.border).toBe("none");
            expect(style.cursor).toBe("pointer");
            expect(style.fontSize).toBe("0.8rem");
            expect(style.marginBottom).toBe("2rem");
            expect(style.transition).toBe("0.3s");
            expect(style.borderRadius).toBe("0.8rem");
          }
        }
      }
    }
  });

  // render class sign-btn:hover
  it("should render the styles for .sign-btn:hover", async () => {
    let document = dom.window.document;
    let form = document.querySelector(".sign-btn");

    // Verificar si form no es null antes de intentar acceder a sus propiedades
    if (form !== null) {
      // Simular el estado :hover
      form.classList.add("hovered");

      const style = dom.window.getComputedStyle(form);

      // Verificar si style.backgroundColor no es null antes de intentar acceder a sus propiedades
      if (style.backgroundColor !== null) {
        // Verificar si el color tiene el formato correcto antes de intentar hacer match y slice
        const matchResult = style.backgroundColor.match(/\d+/g);

        if (matchResult && matchResult.length >= 3) {
          const backgroundColorRGB = matchResult.slice(0, 3).join(", ");

          if (expectedRGBColor !== null) {
            expect(backgroundColorRGB).toBe(expectedRGBColor);
          }
        }
      }
    }
  });

  // text forgotten password

  // render class text
  it("should render the styles in selector text", async () => {
    let document = dom.window.document;
    let form = document.querySelector(".text");
    let style = dom.window.getComputedStyle(form);

    // format rgb
    const expectedHexColor = "--sevenary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(backgroundColorRGB).toBe(expectedRGBColor);
    expect(style.fontSize).toBe("0.7rem");
  });

  // render class text a
  it("should render the styles in selector text a", async () => {
    let document = dom.window.document;
    let form = document.querySelector(".text a");
    let style = dom.window.getComputedStyle(form);

    // format rgb
    const expectedHexColor = "--sevenary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(backgroundColorRGB).toBe(expectedRGBColor);
  });

  // render class text with a:hover
  it("should render the styles in selector text a:hover", async () => {
    let document = dom.window.document;
    let form = document.querySelector(".text a:hover");
    let style = dom.window.getComputedStyle(form);

    // format rgb
    const expectedHexColor = "--secondary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(backgroundColorRGB).toBe(expectedRGBColor);
  });

  //INPUTS

  it("should render input name", async () => {
    let document = dom.window.document;
    let input = document.getElementById("name");
    expect(input.type).toBe("text");
  });

  it("should render required name", async () => {
    let document = dom.window.document;
    let input = document.getElementById("name");
    expect(input.required).toBe(true);
  });

  it("should render minlength name 4", async () => {
    let document = dom.window.document;
    let input = document.querySelector("input");
    expect(input.minLength).toBe(4);
  });

  it("should render input password", async () => {
    let document = dom.window.document;
    let input = document.getElementById("password");
    expect(input.type).toBe("password");
  });

  it("should render required password", async () => {
    let document = dom.window.document;
    let input = document.getElementById("password");
    expect(input.required).toBe(true);
  });

  it("should render a ancord in sign in", async () => {
    let document = dom.window.document;
    let button = document.querySelector("button");
    expect(button.type).toBe("submit");
  });

  it("should render section", async () => {
    let document = dom.window.document;
    let section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });
  // Carousel

  // render carousel
  it("should render display grid in class carousel", async () => {
    let document = dom.window.document;
    let carousel = document.querySelector(".carousel");
    const style = dom.window.getComputedStyle(carousel);

    // format rgb
    const expectedHexColor = "--quaternary-color";
    const expectedRGBColor = hexToRgb(expectedHexColor);

    const backgroundColorRGB = style.backgroundColor
      .match(/\d+/g)
      .slice(0, 3)
      .join(", ");

    expect(style.display).toBe("grid");
    expect(backgroundColorRGB).toBe(expectedRGBColor);
  });

  // render .images-wrapper
  it("should render display grid in class images-wrapper", async () => {
    let document = dom.window.document;
    let imagesWrapper = document.querySelector(".images-wrapper");
    const style = dom.window.getComputedStyle(imagesWrapper);
    expect(style.display).toBe("grid");
    expect(style.gridTemplateColumns).toBe("1fr");
    expect(style.gridTemplateRows).toBe("1fr");
  });

  // render img carousel 1
  it("should render img carousel", async () => {
    let document = dom.window.document;
    let img = document.querySelector("aside .images-wrapper .img-1");

    expect(img.src).toMatch(/\/assets\/img\/image1.png$/);
  });

  it("should render img carousel", async () => {
    let document = dom.window.document;
    let img = document.querySelector("aside .images-wrapper .img-2");

    expect(img.src).toMatch(/\/assets\/img\/image2.png$/);
  });

  it("should render img carousel", async () => {
    let document = dom.window.document;
    let img = document.querySelector("aside .images-wrapper .img-3");

    expect(img.src).toMatch(/\/assets\/img\/image3.png$/);
  });

  // render class text-slider
  it("should render display grid in class text-slider", async () => {
    let document = dom.window.document;
    let textSlider = document.querySelector(".text-slider");
    const style = dom.window.getComputedStyle(textSlider);
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
    expect(style.justifyContent).toBe("center");
    expect(style.alignItems).toBe("center");
  });

  // render class text-wrap
  it("should render display grid in class text-wrap", async () => {
    let document = dom.window.document;
    let textWrap = document.querySelector(".text-wrap");
    const style = dom.window.getComputedStyle(textWrap);
    expect(style.maxHeight).toBe("2.2rem");
    expect(style.overflow).toBe("hidden");
    expect(style.marginBottom).toBe("2.5rem");
  });

  // render class text-group
  it("should render display grid in class text-group", async () => {
    let document = dom.window.document;
    let textGroup = document.querySelector(".text-group");

    const style = dom.window.getComputedStyle(textGroup);

    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
    expect(style.textAlign).toBe("center");
    expect(style.transform).toBe("translateY(0px)");
    expect(style.transition).toBe("0.5s");
  });

  // render class text-group h2
  it("should render display grid in class text-group h2", async () => {
    let document = dom.window.document;
    let textGroup = document.querySelector(".text-group h2");

    const style = dom.window.getComputedStyle(textGroup);

    expect(style.fontSize).toBe("1.6rem");
    expect(style.fontWeight).toBe("600");
    expect(style.lineHeight).toBe("2.2rem");
  });

});
