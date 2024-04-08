import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { FileInput} from '../file-input';

describe('File Input Component', () => {
  let input;

  beforeEach(() => {
    render(
      <>
        <label htmlFor="fileUpload">Upload file</label>
        <FileInput className="bg-primary" id="fileUpload" />
      </>
    );
    input = screen.getByLabelText('Upload file');
  });

  it('should be file selected without getting an error', async () => {
    const file = new File(["logo"], "logo.png", { type: "image/png" });

    expect(input.files.length).toBe(0);

    await waitFor(() =>
      fireEvent.change(input, {
        target: { files: [file] },
      })
    );

    expect(input.files[0].name).toBe("logo.png");
    expect(input.files.length).toBe(1);
  });

  it('should be classname checked', () => {
    expect(input).toHaveClass('bg-primary');
  });

  it('should render a disabled', () => {
    input.setAttribute('disabled', 'true');

    expect(input).toHaveAttribute('disabled');
    expect(input).toBeDisabled();
  });
});
