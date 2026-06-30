const PDFDocument = require("pdfkit");
const path = require("path");

const generatePDF = (product, res) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=${product.productName}.pdf`
  );

  doc.pipe(res);

  // ===========================
  // HEADER
  // ===========================

  doc
    .fontSize(24)
    .fillColor("#1E3A8A")
    .text("PRODUCT DETAILS", {
      align: "center",
    });

  doc.moveDown();

  doc
    .strokeColor("#cccccc")
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown();

  // ===========================
  // PRODUCT DETAILS
  // ===========================

  doc
    .fillColor("black")
    .fontSize(18)
    .text("Product Information");

  doc.moveDown(0.5);

  doc.font("Helvetica-Bold");
  doc.text("Product Name:", { continued: true });

  doc.font("Helvetica");
  doc.text(` ${product.productName}`);

  doc.font("Helvetica-Bold");
  doc.text("Description:", { continued: true });

  doc.font("Helvetica");
  doc.text(` ${product.description}`);

  doc.moveDown();

  // ===========================
  // BRANDS
  // ===========================

  doc
    .fontSize(18)
    .fillColor("#1E3A8A")
    .text("Brand Details");

  doc.moveDown();

  product.brands.forEach((brand, index) => {
    // Border Box

    const startY = doc.y;

    doc
      .rect(45, startY - 5, 510, 150)
      .stroke("#d1d5db");

    doc
      .fillColor("black")
      .fontSize(15)
      .text(`Brand ${index + 1}`, 60, startY + 10);

    doc.font("Helvetica-Bold");
    doc.text("Brand Name:", 60, startY + 35, {
      continued: true,
    });

    doc.font("Helvetica");
    doc.text(` ${brand.brandName}`);

    doc.font("Helvetica-Bold");
    doc.text("Detail:", 60, startY + 60, {
      continued: true,
    });

    doc.font("Helvetica");
    doc.text(` ${brand.detail}`);

    doc.font("Helvetica-Bold");
    doc.text("Price:", 60, startY + 85, {
      continued: true,
    });

    doc.font("Helvetica");
    doc.text(` Rs. ${brand.price}`);

    // ===========================
    // IMAGE
    // ===========================

    try {
      const imagePath = path.join(
        __dirname,
        "../../",
        brand.image
      );

      doc.image(imagePath, 380, startY + 15, {
        width: 120,
        height: 100,
      });

    } catch (err) {

      doc
        .fontSize(10)
        .fillColor("red")
        .text(
          "Image Not Available",
          380,
          startY + 45
        );

    }

    doc.moveDown(9);
  });

  // ===========================
  // TOTAL
  // ===========================

  doc.moveDown();

  doc
    .fillColor("#065F46")
    .fontSize(18)
    .text(
      `Total Price : Rs. ${product.totalPrice}`,
      {
        align: "right",
      }
    );

  doc.moveDown();

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      `Generated on : ${new Date().toLocaleString()}`,
      {
        align: "center",
      }
    );

  doc.end();
};

module.exports = generatePDF;