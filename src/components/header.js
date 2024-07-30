import { Link } from "gatsby";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import BlogIcon from "../assets/icons/blogIcon";
import UserIcon from "../assets/icons/userIcon";
import Logo from "../assets/logo/meetguns";
import { captureEvent } from "../utils/ga";
import SwitcherButton from "./SwitcherButton";
import AccentSwitcher from "./accentSwitcher";

const switchTheme = (theme, toggleTheme) => {
	const nextTheme = theme === "dark" ? "light" : "dark";
	toggleTheme(nextTheme);
	// Add attribute to html tag, useful for view transition
	document.body.parentElement.setAttribute("data-theme", nextTheme);
	captureEvent(nextTheme, "change", "Theme");
};

const HeaderRow = styled.header`
  position: sticky;
  top: -1px;
  z-index: 1;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -20px;
  margin-right: -20px;
  padding: 10px 15px;
  --opacity: 0;
  background: transparent;
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
  transition:
    background 0.2s ease-out,
    backdrop-filter 0.2s ease-out,
    padding 0.2s ease-out;

  &.pinned {
    --opacity: 0.85;
    background: rgb(from var(--color-dark) r g b / var(--opacity));
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition:
      background 0.25s ease-in,
      backdrop-filter 0.25s ease-in,
      padding 0.25s ease-in;
  }

  @media screen and (max-width: 767px) {
    order: 1;
    bottom: 0;
    top: unset;
    box-shadow: 0 -4px 4px -4px var(--color-light-op-2);
    --opacity: 0.85;
    background: rgb(from var(--color-dark) r g b / var(--opacity));
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    margin-left: -30px;
    margin-right: -30px;
    padding: 20px 25px;

    &.pinned {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  @media screen and (min-width: 992px) {
    margin-left: -30px;
    margin-right: -30px;
    padding: 20px 0;

    &.pinned {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;

const HeaderWrapper = styled.div`
  max-width: 840px;
  margin: 0 auto;
  align-self: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const LogoWrapper = styled.div`
  --opacity: 0.05;
  background: rgb(from var(--color-light) r g b / var(--opacity));
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border-radius: 40% 60% 40% 60% / 35% 30% 70% 65%;

  svg {
    height: 30px;
    path {
      fill: var(--color-accent);
    }
  }

  @media screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
    box-shadow: none !important;

    svg {
      height: 20px;
    }
  }

  @media screen and (hover: hover) and (pointer: fine) {
    transition:
      transform 0.3s ease-out,
      background 0.3s ease-out,
      border-radius 0.15s ease-out;

    &:hover,
    &.init-hover-animate-state {
      --opacity: 0.2;
      background: rgb(from var(--color-accent) r g b / var(--opacity));
      transition:
        transform 0.5s ease-in-out,
        background 0.5s ease-in-out,
        border-radius 0.2s ease-in-out;
      border-radius: 35% 65% 55% 45% / 48% 48% 52% 52%;
      transform: translateY(-2px);
    }
  }
`;

const Left = styled.div`
  display: inline-flex;
  align-items: center;
`;
const Right = styled.div`
  display: inline-flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  @media screen and (max-width: 767px) {
    margin-right: ${(prop) => (prop.active ? "0.25rem" : 0)};
  }

  @media screen and (min-width: 768px) {
    svg {
      transform: translateY(4px) scale(0.8) !important;
      margin-right: 0.25rem;

      @media screen and (hover: hover) and (pointer: fine) {
        &:hover {
          transform: translateY(4px) scale(0.8) !important;
        }
      }
    }
  }
`;

const RouteLinks = styled.div`
  margin-left: 1rem;

  @media screen and (max-width: 767px) {
    margin-left: 0.6rem;
  }

  a {
    color: var(--color-accent);
    margin: 0 0.2rem;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.2s ease-out;
    padding: 8px 15px;
    border-radius: 20px;

    &.active {
      color: var(--color-dark);
      --opacity: 0.1;
      background: var(--color-accent);
    }

    svg path {
      fill: var(--color-accent);
    }

    &.active svg path {
      fill: var(--color-dark);
    }

    @media screen and (hover: hover) and (pointer: fine) {
      ${IconWrapper} path {
        transition: fill 0.2s ease-out;
      }

      &.active svg:hover path {
        fill: var(--color-accent) !important;
      }

      &:hover:not(.active) {
        color: var(--color-accent);
        --opacity: 0.1;
        background: rgb(from var(--color-accent) r g b / var(--opacity));

        ${IconWrapper} path {
          transition: fill 0.25s ease-in;
          fill: var(--color-accent) !important;
        }
      }
    }

    @media screen and (max-width: 767px) {
      margin: 0 5px;
      padding: 8px 10px;
    }
  }
`;

const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  justify-content: center;

  @media screen and (max-width: 767px) {
    transform: translate(-2px, -2.4px);
  }
`;

const ToggleInput = styled.input`
  --size: 1rem;

  appearance: none;
  outline: none;
  cursor: pointer;

  width: var(--size);
  height: var(--size);
  box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
  border-radius: 999px;
  color: var(--color-accent);

  transition: all 500ms;

  &:checked {
    --ray-size: calc(var(--size) * -0.4);
    --offset-orthogonal: calc(var(--size) * 0.7);
    --offset-diagonal: calc(var(--size) * 0.5);

    transform: scale(0.75);
    color: var(--color-accent);
    box-shadow:
      inset 0 0 0 var(--size),
      calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
      var(--offset-orthogonal) 0 0 var(--ray-size),
      0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
      0 var(--offset-orthogonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0
        var(--ray-size),
      var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
      calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
      var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
  }
`;

function LightDarkMoonOrSun({ isDark }) {
	return <ToggleInput type="checkbox" checked={isDark} />;
}

const links = [
	{
		link: "/",
		name: "About",
		icon: UserIcon,
	},
	{
		link: "/blog/",
		name: "Blog",
		icon: BlogIcon,
	},
];

const Header = ({ location: { pathname } }) => {
	const [logoActiveAnimateState, setLogoAnimateState] = useState(false);
	const [jsEnabled, setJSEnabled] = useState(false);
	const headerRef = useRef(null);

	// Animate hover state to normal state initially on logo
	useEffect(() => {
		setJSEnabled(true);
		setLogoAnimateState(true);
		const timer = setTimeout(() => {
			setLogoAnimateState(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const el = headerRef.current;

		if (!el) {
			return;
		}

		const observer = new IntersectionObserver(
			([e]) => e.target.classList.toggle("pinned", e.intersectionRatio < 1),
			{ threshold: [1] },
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
		};
	}, []);

	const onThemeChange = useCallback((theme, toggleTheme) => {
		if (!document.startViewTransition) {
			return switchTheme(theme, toggleTheme);
		}
		document.startViewTransition(() => switchTheme(theme, toggleTheme));
	}, []);

	return (
		<HeaderRow ref={headerRef}>
			<HeaderWrapper>
				<Left>
					<Link title={"Meetguns.com | About"} to={"/"}>
						<LogoWrapper
							className={`${
								logoActiveAnimateState ? "init-hover-animate-state" : ""
							}`}
						>
							<Logo color="var(--color-dark)" />
						</LogoWrapper>
					</Link>
					<RouteLinks>
						{links.map(({ link, name, icon: Icon }) => {
							const active =
								(pathname === "/" && pathname === link) ||
								(link !== "/" && pathname.startsWith(link));

							return (
								<Link
									key={`${link}_${pathname}`}
									title={name}
									className={`${active ? "active" : ""}`}
									to={link}
								>
									<IconWrapper active={active} className="hide-xs">
										<Icon active={active} />
									</IconWrapper>
									<span>{name}</span>
								</Link>
							);
						})}
					</RouteLinks>
				</Left>
				<Right>
					{jsEnabled ? (
						<>
							<AccentSwitcher />
							<ThemeToggler>
								{({ theme, toggleTheme }) => (
									<SwitcherButton
										role="button"
										tabIndex={0}
										onKeyPress={(e) => {
											if (e.which === 13 || e.which === 32) {
												onThemeChange(theme, toggleTheme);
											}
										}}
										title={
											theme === "dark"
												? "Switch to light theme"
												: "Switch to dark theme"
										}
										onClick={() => {
											onThemeChange(theme, toggleTheme);
										}}
									>
										<ThemeSwitcher>
											<LightDarkMoonOrSun isDark={theme === "dark"} />
										</ThemeSwitcher>
									</SwitcherButton>
								)}
							</ThemeToggler>
						</>
					) : null}
				</Right>
			</HeaderWrapper>
		</HeaderRow>
	);
};

export default Header;
