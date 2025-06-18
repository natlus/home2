interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  download_url?: string;
  html_url: string;
}

export async function getDotfiles() {
  let files: GitHubFile[] = [];

  try {
    const apiUrl = `https://api.github.com/repos/natlus/dotfiles/contents/`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      files = data.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type,
        size: item.size,
        download_url: item.download_url,
        html_url: item.html_url,
        url: item.url,
      }));
    } else {
      // Single file
      files = [
        {
          name: data.name,
          path: data.path,
          type: data.type,
          size: data.size,
          download_url: data.download_url,
          html_url: data.html_url,
        },
      ];
    }
  } catch (err) {
    console.error("Error fetching GitHub repository files:", err);
  }

  return files;
}
