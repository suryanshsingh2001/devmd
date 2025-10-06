# DevMD 🎨
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://devmd.surydev.site/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-blueviolet.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-blue.svg)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img width="1536" height="1024" alt="ChatGPT Image Oct 6, 2025, 09_22_08 PM" src="https://github.com/user-attachments/assets/a56a2153-0605-4117-86dc-68c2eb8537fb" />

DevMD is a powerful open-source tool that helps content creators convert Medium or Peerlist blog posts into dev.to-ready Markdown — powered by **Google Gemini Flash**.
Whether you're migrating your content or optimizing it for a new audience, DevMD ensures clean formatting, accurate conversion, and context retention.


## ✨ Features

1. **AI-Powered Conversion** – Uses Google’s Gemini Flash model to transform your Medium blog post into dev.to-friendly Markdown.  
2. **Easy-to-Use Interface** – Paste your article, click convert, and you’re done.  
3. **Peerlist Article Support** – Paste your Peerlist URL and import instantly.
4. **Medium Article Support** - Paste your Medium URL and import instantly.
5. **Accurate Formatting** – Maintains headings, paragraphs, and styling automatically.  
6. **Open Source** – Contribute this Hacktoberfest to make DevMD even better!

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or later): Check your current version by running `node -v`.
- **npm or yarn**: If you're using npm or Yarn, you can run `npm -v` or `yarn -v`.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/suryanshsingh2001/devmd.git
   ```

2. Navigate to the project directory:
   ```
   cd devmd
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

🧠 How It Works

1. Paste your Medium or Peerlist article content (or URL).

2. DevMD uses AI (Gemini Flash) to parse and structure your article.

3. The Markdown output is formatted specifically for dev.to.

4. Copy and publish it directly to your dev.to editor!


---

## ⚠️ Limitations
- 🖼️ **No Image Support:** Currently, images need to be manually uploaded to dev.to.  
- ✂️ **Word Limit:** Articles above 5,000 characters need to be split into parts.  

---

## 🔮 Future Scope
- 🧩 **Image Parsing & Automatic Uploads:** Automatically detect and upload Medium images to dev.to.  
- 🌐 **Browser Extension:** Convert Medium or Peerlist articles directly from your browser.  
- 🪄 **Rich Formatting Enhancements:** Better support for code blocks, embeds, and custom Markdown.  
- 🔍 **SEO Optimization Suggestions:** AI-based recommendations to improve your blog visibility.  
- 🤝 **Community Templates:** Allow users to share conversion templates for different platforms.  
- 📊 **Analytics Dashboard:** Track conversion history and performance.  

---

## 🎉 Hacktoberfest 2025

We're excited to participate in Hacktoberfest 2025! Here's how you can contribute:

### 📜 Ground Rules

1. Contributions must be meaningful and add value to the project.
2. Follow our code style and best practices.
3. Be respectful and collaborative in discussions.
4. Test your changes thoroughly before submitting a PR.

### 🛠️ How to Contribute

1. Fork the repository to your GitHub account.
2. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```
   or
   ```
   git checkout -b fix/your-bug-fix-name
   ```
3. Make your changes, ensuring they align with the issue template if addressing a specific issue.
4. Commit your changes with a clear and descriptive commit message.
5. Push your branch to your forked repository:
   ```
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request (PR) to our `main` branch.

### 🔄 Pull Request Process

1. Ensure your PR description clearly describes the problem and solution. Include the relevant issue number if applicable.
2. Include screenshots or GIFs in your PR if you've made UI changes.
3. Make sure your code is properly formatted and passes all tests.
4. Your PR will be reviewed by maintainers. Be open to feedback and make necessary changes.
5. Once approved, your PR will be merged into the main codebase.

### 📝 Issue Templates

When creating a new issue or PR, please use our provided templates:

- For bug reports: [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- For feature requests: [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- For pull requests: [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)

### 🐛 Existing Issues and Contributions

We encourage contributors to explore our [existing issues](https://github.com/suryanshsingh2001/devmd/issues) and contribute to them. Here are some ways you can help:

1. **Bug Fixes**: Look for issues labeled `bug` and help us squash them!
2. **Feature Implementation**: Issues labeled `enhancement`or `feature` are great opportunities to add new features to DevMD.
3. **Documentation**: Help us improve our docs by addressing issues labeled `documentation`.
4. **UI/UX Improvements**: If you have design skills, look for issues labeled `ui` or `ux`.

Don't see an issue that matches your interests? Feel free to [create a new issue](https://github.com/suryanshsingh2001/devmd/issues/new/choose) and discuss your ideas with the community!

We look forward to your contributions and hope you enjoy participating in Hacktoberfest with DevMD!

## ❓  Frequently Asked Questions (FAQs)

<details> <summary>1. What is DevMD?</summary> DevMD converts your Medium or Peerlist articles into dev.to-ready Markdown, preserving structure and readability using AI. </details> <details> <summary>2. How does DevMD work?</summary> You paste your article content or URL, and DevMD’s AI reformats it into Markdown suitable for dev.to. </details> <details> <summary>3. Does DevMD support images?</summary> Not yet — you’ll need to manually upload them to dev.to. Image support is coming soon. </details> <details> <summary>4. Which AI model powers DevMD?</summary> DevMD is powered by Google’s **Gemini Flash**, known for fast and high-quality text understanding. </details> <details> <summary>5. Is DevMD open source?</summary> Yes! DevMD is open source — contributions are encouraged, especially during Hacktoberfest. </details> <details> <summary>6. How many conversions can I do?</summary> Up to 5 conversions per day are allowed to maintain fair usage. </details>

## 👥 Contributing

We welcome contributions from the community! Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details on our year-round contribution process.


<a href="https://github.com/suryanshsingh2001/devmd/graphs/contributors"> <img src="https://contrib.rocks/image?repo=suryanshsingh2001/devmd" /> </a>

## 🤝 Code of Conduct

We are committed to fostering an inclusive and welcoming community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

- Project Maintainer: [Suryansh](https://www.linkedin.com/in/suryanshsingh2001/)
- Project Website: [https://www.devmd.site](https://devmd.surydev.site/))

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape DevMD.
- Built with [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/).
- Icons provided by [Lucide](https://lucide.dev/).

---

Made with ❤️ by the DevMD community
