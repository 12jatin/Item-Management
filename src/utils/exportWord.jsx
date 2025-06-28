// utils/exportWord.js
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const exportToWord = (resumeData) => {
  const {
    personalInfo,
    professionalSummary,
    workExperience,
    education,
    skills,
  } = resumeData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: personalInfo.fullName, bold: true, size: 28 })],
          }),
          new Paragraph(`${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`),

          new Paragraph({ text: "Professional Summary", heading: "Heading1" }),
          new Paragraph(professionalSummary),

          new Paragraph({ text: "Work Experience", heading: "Heading1" }),
          ...workExperience.map(exp =>
            new Paragraph([
              new TextRun({ text: `${exp.title} at ${exp.company}`, bold: true }),
              new TextRun({ text: ` (${exp.duration})`, italics: true }),
              new TextRun({ text: `\n${exp.description}` }),
            ])
          ),

          new Paragraph({ text: "Education", heading: "Heading1" }),
          ...education.map(edu =>
            new Paragraph([
              new TextRun({ text: `${edu.degree}, ${edu.institution}`, bold: true }),
              new TextRun({ text: ` (${edu.year})\n${edu.description}` }),
            ])
          ),

          new Paragraph({ text: "Skills", heading: "Heading1" }),
          new Paragraph(skills.map(skill => `${skill.name} (${skill.level})`).join(", "))
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${personalInfo.fullName || 'resume'}.docx`);
  });
};
