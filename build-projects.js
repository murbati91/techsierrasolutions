#!/usr/bin/env node
/**
 * Build Projects Script
 * Combines individual project JSON files into the main projects.json
 *
 * Usage:
 *   node build-projects.js           - Build projects.json from individual files
 *   node build-projects.js --check   - Validate JSON files without building
 *   node build-projects.js --list    - List all project files
 */

const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, 'projects');
const OUTPUT_FILE = path.join(__dirname, 'projects.json');

// Categories mapping (preserved from original)
const CATEGORIES = {
  "ai": "AI/ML",
  "enterprise": "Enterprise",
  "platforms": "Platforms",
  "automation": "Automation",
  "blockchain": "Blockchain",
  "devops": "DevOps",
  "mobile": "Mobile"
};

// Known broken links (preserved from original)
const BROKEN_LINKS = [
  {
    "url": "https://calendly.com/techsierrasolutions",
    "issue": "Calendly page not found (404)",
    "action": "Create calendly scheduling page or remove link"
  },
  {
    "url": "https://menapool.com",
    "issue": "SSL error, redirects to non-existent Vercel deployment",
    "action": "Use app.menapool.com only - base domain deprecated"
  }
];

/**
 * Read all project JSON files from the projects directory
 */
function readProjectFiles() {
  const projects = [];
  const errors = [];

  // Get all JSON files in the projects directory
  const files = fs.readdirSync(PROJECTS_DIR)
    .filter(file => file.endsWith('.json'))
    .sort();

  console.log(`Found ${files.length} project files\n`);

  for (const file of files) {
    const filePath = path.join(PROJECTS_DIR, file);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const project = JSON.parse(content);

      // Validate required fields
      const requiredFields = ['id', 'title', 'url', 'image', 'description', 'category', 'tags', 'status'];
      const missingFields = requiredFields.filter(field => !project.hasOwnProperty(field));

      if (missingFields.length > 0) {
        errors.push(`${file}: Missing required fields: ${missingFields.join(', ')}`);
        continue;
      }

      // Validate status
      const validStatuses = ['live', 'pending', 'auth_required'];
      if (!validStatuses.includes(project.status)) {
        errors.push(`${file}: Invalid status "${project.status}". Must be one of: ${validStatuses.join(', ')}`);
        continue;
      }

      // Validate category
      if (!CATEGORIES.hasOwnProperty(project.category)) {
        errors.push(`${file}: Invalid category "${project.category}". Must be one of: ${Object.keys(CATEGORIES).join(', ')}`);
        continue;
      }

      // Add image path prefix if not already present
      if (!project.image.startsWith('/projects/')) {
        project.image = `/projects/${project.image}`;
      }

      // Ensure boolean fields have defaults
      if (typeof project.verified !== 'boolean') {
        project.verified = false;
      }
      if (typeof project.featured !== 'boolean') {
        project.featured = false;
      }

      projects.push(project);
      console.log(`  [OK] ${file} - ${project.title}`);

    } catch (err) {
      if (err instanceof SyntaxError) {
        errors.push(`${file}: Invalid JSON - ${err.message}`);
      } else {
        errors.push(`${file}: ${err.message}`);
      }
    }
  }

  return { projects, errors };
}

/**
 * Sort projects: featured first, then by category, then alphabetically
 */
function sortProjects(projects) {
  return projects.sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then by category
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }

    // Then alphabetically by title
    return a.title.localeCompare(b.title);
  });
}

/**
 * Build the main projects.json file
 */
function buildProjectsJson(projects) {
  const sortedProjects = sortProjects(projects);

  const output = {
    version: "1.2.0",
    lastUpdated: new Date().toISOString().split('T')[0],
    projects: sortedProjects,
    brokenLinks: BROKEN_LINKS,
    categories: CATEGORIES
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');
  console.log(`\nBuilt projects.json with ${projects.length} projects`);
}

/**
 * List all project files
 */
function listProjects() {
  const files = fs.readdirSync(PROJECTS_DIR)
    .filter(file => file.endsWith('.json'))
    .sort();

  console.log('Project files in projects/ directory:\n');
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
  console.log(`\nTotal: ${files.length} files`);
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--list')) {
  listProjects();
  process.exit(0);
}

console.log('===========================================');
console.log('  TechSierra Projects Builder');
console.log('===========================================\n');

const { projects, errors } = readProjectFiles();

if (errors.length > 0) {
  console.log('\n--- ERRORS ---');
  errors.forEach(err => console.log(`  [ERROR] ${err}`));
  console.log('\nFix the errors above before building.\n');
  process.exit(1);
}

if (args.includes('--check')) {
  console.log('\n--- VALIDATION PASSED ---');
  console.log(`All ${projects.length} project files are valid.`);
  process.exit(0);
}

buildProjectsJson(projects);

console.log('\n===========================================');
console.log('  Build Complete!');
console.log('===========================================');
