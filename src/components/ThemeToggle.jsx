import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ThemeToggle() {
  const [checked, setChecked] = useState(() => {
    const current = document.documentElement.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    return current === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
  }, [checked]);

  const handleChange = (e) => {
    const next = e.target.checked;
    setChecked(next);
    try { localStorage.setItem('gloma-theme', next ? 'dark' : 'light'); } catch (err) {}
  };

  return (
    <StyledWrapper>
      <label className="switch" aria-label="Toggle day/night theme">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    --background: #28096b;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: .5s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow: inset 8px -4px 0px 0px #fff000;
    background: var(--background);
    transition: .5s;
  }

  input:checked + .slider {
    background-color: #522ba7;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px #fff000;
  }

  @media (max-width: 768px) {
    .switch {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .switch {
      font-size: 11px;
    }
  }
`;
