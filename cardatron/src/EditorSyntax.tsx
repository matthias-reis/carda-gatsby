import { GlobalStyles, css } from '@mui/material';

export const EditorSyntax = () => {
  return (
    <GlobalStyles
      styles={css`
        .hljs {
          font-family: 'Fira Code', 'Menlo', monospace;
          font-size: 1rem;
          color: #bbb;
          max-width: 660px;
        }

        .hljs textarea {
          border: 0;
          outline: 0;
        }

        .hljs .hljs-section {
          font-weight: bold;
          color: #fff;
        }
        .hljs .hljs-bullet {
          color: #5c9b72;
        }
        .hljs .hljs-link {
          color: #96c6a7;
          text-decoration: underline;
        }
        .hljs .hljs-tag {
          color: #fff;

          .hljs-string {
            color: #96c6a7;
          }
        }
      `}
    />
  );
};
