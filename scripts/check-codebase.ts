import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

const IGNORE_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'out',
];

const FILE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.css',
  '.scss',
];

interface FileIssue {
  path: string;
  issues: string[];
}

function checkFile(path: string): FileIssue | null {
  const issues: string[] = [];
  const content = execSync(`cat "${path}"`).toString();

  // Check for common issues
  if (content.includes('any')) {
    issues.push('Contains "any" type - consider using proper TypeScript types');
  }

  if (content.includes('console.log')) {
    issues.push('Contains console.log - should be removed in production');
  }

  if (content.includes('TODO')) {
    issues.push('Contains TODO comment - should be addressed');
  }

  if (content.includes('FIXME')) {
    issues.push('Contains FIXME comment - should be addressed');
  }

  if (content.includes('@ts-ignore')) {
    issues.push('Contains @ts-ignore - should be fixed properly');
  }

  if (content.includes('@ts-nocheck')) {
    issues.push('Contains @ts-nocheck - should be fixed properly');
  }

  // Check for empty files
  if (content.trim().length === 0) {
    issues.push('File is empty');
  }

  // Check for proper exports
  if (content.includes('export default') && content.includes('export const')) {
    issues.push('Mixes default and named exports - should be consistent');
  }

  // Check for proper error handling
  if (content.includes('try {') && !content.includes('catch')) {
    issues.push('Try block without catch - should handle errors');
  }

  // Check for proper async/await usage
  if (content.includes('.then(') && content.includes('async')) {
    issues.push('Mixes Promise chains and async/await - should be consistent');
  }

  return issues.length > 0 ? { path, issues } : null;
}

function walkDir(dir: string): FileIssue[] {
  const issues: FileIssue[] = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const path = join(dir, file);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        issues.push(...walkDir(path));
      }
    } else if (FILE_EXTENSIONS.some(ext => file.endsWith(ext))) {
      const fileIssues = checkFile(path);
      if (fileIssues) {
        issues.push(fileIssues);
      }
    }
  }

  return issues;
}

// Run the check
console.log(chalk.blue('🔍 Checking codebase for potential issues...\n'));

const issues = walkDir('src');

if (issues.length === 0) {
  console.log(chalk.green('✅ No issues found!'));
} else {
  console.log(chalk.yellow(`⚠️  Found ${issues.length} files with potential issues:\n`));
  
  issues.forEach(({ path, issues }) => {
    console.log(chalk.cyan(`\n📁 ${path}`));
    issues.forEach(issue => {
      console.log(chalk.red(`  • ${issue}`));
    });
  });
}

console.log('\n'); 