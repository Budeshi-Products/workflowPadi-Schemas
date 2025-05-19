import { createCanvas } from "canvas";
import fs from "fs";
import mermaid from "mermaid";
import mongoose from "mongoose";

// Initialize mermaid
mermaid.initialize({
	startOnLoad: true,
	theme: "default",
	securityLevel: "loose",
});

/**
 * Visualize MongoDB/Mongoose schema as a diagram
 * @param {Object} options - Configuration options
 * @param {mongoose.Schema|Object} options.schema - Mongoose schema or plain object
 * @param {string} options.outputPath - Path to save the output
 * @param {string} options.format - Output format ('svg', 'png', 'mermaid')
 * @param {boolean} options.includeValidation - Include validation rules
 * @returns {Promise<string>} - Path to the generated file
 */
export async function visualizeSchema(options) {
	const {
		schema,
		outputPath = "./schema-visualization",
		format = "mermaid",
		includeValidation = true,
		modelName = "Document",
	} = options;

	// Extract schema structure
	const schemaInfo = extractSchemaInfo(schema, modelName, includeValidation);

	switch (format.toLowerCase()) {
		case "mermaid":
			return generateMermaidDiagram(schemaInfo, outputPath);
		case "json":
			return generateJsonOutput(schemaInfo, outputPath);
		case "svg":
		case "png":
			return generateImageDiagram(schemaInfo, outputPath, format);
		default:
			throw new Error(`Unsupported format: ${format}`);
	}
}

/**
 * Extract schema information from a Mongoose schema
 */
function extractSchemaInfo(schema, modelName, includeValidation) {
	// Handle both Mongoose schema and plain objects
	const paths = schema.paths || schema;
	const schemaInfo = {
		name: modelName,
		fields: [],
		relations: [],
	};

	Object.keys(paths).forEach((path) => {
		// Skip internal Mongoose fields
		if (path === "__v" || path === "_id") return;

		const fieldInfo = { name: path };
		const fieldSchema = paths[path];

		// Handle different ways of schema representation
		if (fieldSchema.instance) {
			// Mongoose schema path
			fieldInfo.type = fieldSchema.instance;

			if (includeValidation && fieldSchema.validators) {
				fieldInfo.validation = fieldSchema.validators.map(
					(v) => v.message || v.type,
				);
			}

			if (fieldSchema.options) {
				if (fieldSchema.options.ref) {
					fieldInfo.ref = fieldSchema.options.ref;
					schemaInfo.relations.push({
						from: modelName,
						to: fieldSchema.options.ref,
						relationship: "references",
					});
				}

				if (fieldSchema.options.required) {
					fieldInfo.required = true;
				}
			}
		} else if (typeof fieldSchema === "object" && !Array.isArray(fieldSchema)) {
			// Plain object schema or nested schema
			if (fieldSchema.type) {
				fieldInfo.type = getTypeName(fieldSchema.type);

				if (fieldSchema.ref) {
					fieldInfo.ref = fieldSchema.ref;
					schemaInfo.relations.push({
						from: modelName,
						to: fieldSchema.ref,
						relationship: "references",
					});
				}

				if (fieldSchema.required) {
					fieldInfo.required = true;
				}
			} else {
				// Nested object
				fieldInfo.type = "Object";
				fieldInfo.nested = true;

				// Recursively extract nested schema
				const nestedName = `${modelName}_${path}`;
				fieldInfo.schema = extractSchemaInfo(
					fieldSchema,
					nestedName,
					includeValidation,
				);

				schemaInfo.relations.push({
					from: modelName,
					to: nestedName,
					relationship: "embeds",
				});
			}
		} else {
			// Simple field with direct type assignment
			fieldInfo.type = getTypeName(fieldSchema);
		}

		schemaInfo.fields.push(fieldInfo);
	});

	return schemaInfo;
}

/**
 * Get type name from schema type definition
 */
function getTypeName(type) {
	if (Array.isArray(type)) {
		return `[${getTypeName(type[0])}]`;
	}

	if (typeof type === "function") {
		return type.name || "Mixed";
	}

	return String(type);
}

/**
 * Generate Mermaid diagram
 */
function generateMermaidDiagram(schemaInfo, outputPath) {
	let mermaid = "classDiagram\n";

	// Add class definition
	mermaid += `  class ${schemaInfo.name} {\n`;

	// Add fields
	schemaInfo.fields.forEach((field) => {
		let fieldStr = `    ${field.name}: ${field.type}`;

		if (field.required) {
			fieldStr += " [Required]";
		}

		mermaid += fieldStr + "\n";
	});

	mermaid += "  }\n\n";

	// Add nested schemas
	schemaInfo.fields
		.filter((field) => field.nested && field.schema)
		.forEach((field) => {
			const nestedMermaid = generateMermaidDiagram(field.schema, null);
			mermaid += nestedMermaid;
		});

	// Add relationships
	schemaInfo.relations.forEach((relation) => {
		mermaid += `  ${relation.from} ${
			relation.relationship === "embeds" ? "*--" : "-->"
		} ${relation.to}\n`;
	});

	if (outputPath) {
		const fullPath = `${outputPath}.mmd`;
		fs.writeFileSync(fullPath, mermaid);
		return fullPath;
	}

	return mermaid;
}

/**
 * Generate JSON output
 */
function generateJsonOutput(schemaInfo, outputPath) {
	const fullPath = `${outputPath}.json`;
	fs.writeFileSync(fullPath, JSON.stringify(schemaInfo, null, 2));
	return fullPath;
}

/**
 * Generate image diagram (simplified)
 */
function generateImageDiagram(schemaInfo, outputPath, format) {
	// This is a placeholder - in a real implementation,
	// you would use a library like D3.js or canvas to draw the diagram

	// Simple implementation to demonstrate the concept
	const canvas = createCanvas(800, 600);
	const ctx = canvas.getContext("2d");

	// Draw background
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, 800, 600);

	// Draw schema box
	ctx.fillStyle = "#e0e0ff";
	ctx.fillRect(50, 50, 700, 500);

	// Draw title
	ctx.fillStyle = "#000000";
	ctx.font = "bold 24px Arial";
	ctx.fillText(schemaInfo.name, 60, 80);

	// Draw fields
	ctx.font = "16px Arial";
	schemaInfo.fields.forEach((field, index) => {
		const y = 120 + index * 30;
		ctx.fillText(`${field.name}: ${field.type}`, 70, y);
	});

	// Save the image
	const fullPath = `${outputPath}.${format}`;
	const stream = fs.createWriteStream(fullPath);

	if (format === "png") {
		const buffer = canvas.toBuffer("image/png");
		fs.writeFileSync(fullPath, buffer);
	} else {
		const svg = canvas.toBuffer();
		fs.writeFileSync(fullPath, svg);
	}

	return fullPath;
}

// Example usage
/*
import mongoose from 'mongoose';
import { visualizeSchema } from './schema-visualizer.js';

// Define your Mongoose schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  interests: [String],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Visualize the schema
visualizeSchema({
  schema: userSchema,
  outputPath: './user-schema',
  format: 'mermaid',
  modelName: 'User'
}).then(filePath => {
  console.log(`Schema visualization saved to: ${filePath}`);
});
*/
