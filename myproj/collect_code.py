import os


def collect_code_files(output_file, extensions):
    with open(output_file, "w", encoding="utf-8") as outfile:
        for root, dirs, files in os.walk(os.getcwd(), topdown=True):
            # Skip node_modules directories
            dirs[:] = [d for d in dirs if d != 'node_modules']
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    file_path = os.path.join(root, file)
                    outfile.write(f"--- Start of {file_path} ---\n\n")
                    with open(file_path, "r", encoding="utf-8") as infile:
                        outfile.write(infile.read())
                    outfile.write(f"\n\n--- End of {file_path} ---\n\n")


if __name__ == "__main__":
    output_file = "all_code_files.txt"
    extensions = [
        ".c",
        ".h",
        ".cpp",
        ".py",
        ".java",
        ".cs",
        ".js",
        ".ts",
        ".html",
        ".css",
        ".rb",
        ".go",
        ".rs",
        ".php",
        ".swift",
        ".sh",
        ".tsx",
    ]
    collect_code_files(output_file, extensions)
    print(f"All code files have been collected into {output_file}")