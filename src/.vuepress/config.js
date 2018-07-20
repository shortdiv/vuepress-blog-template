const path = require('path');
const glob = require('glob');
const fs = require('fs');

const generatePaths = dir => {
  let filenames = []
  const files = glob.sync('**/*.md', { cwd: path.join(__dirname, '..', dir) })
  const filteredFiles = 
    files
      .filter(file => path.basename(file, '.md') !== 'README')
      .map(f => {
        const [year, month, day, filename] = f.split('/')
        const plainFilename = path.basename(filename, '.md')
        return { year, month, day, plainFilename }
      })
      .forEach(thing => {
        filenames.push(`${thing['year']}/${thing['month']}/${thing['day']}/${thing['plainFilename']}.md`)
      })
  return filenames
}

module.exports = {
  title: '😍',
  description: 'The ideal template for using VuePress with Netlify',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Posts', link: '/posts/' }
    ],
    sidebar: {
      '/posts/': [
        '',
        ...generatePaths('/posts')
      ]
    }
  }
}