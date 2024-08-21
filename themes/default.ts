const tokens = {
  black: "#000000",
  gray: {
    c100: "#E0E0E0", // Light gray
    c200: "#B0B0B0",
    c300: "#808080",
    c400: "#606060",
    c500: "#404040", // Mid gray
    c600: "#303030",
    c700: "#202020",
    c800: "#121212",
    c900: "#000000", // Darkest gray
  },
  shade: {
    c25: "#6D6D6D", // Light shade
    c50: "#585858",
    c100: "#404040",
    c200: "#303030",
    c300: "#1A1A1A",
    c400: "#121212",
    c500: "#0D0D0D", // Mid shade
    c600: "#0A0A0A",
    c700: "#050505",
    c800: "#000000", // Darkest shade
    c900: "#000000", // Darker shade (same as c800)
  },
  ash: {
    c50: "#B0B0B0", // Light ash
    c100: "#9E9E9E",
    c200: "#7D7D7D",
    c300: "#5D5D5D",
    c400: "#3D3D3D",
    c500: "#2E2E2E", // Mid ash
    c600: "#1F1F1F",
    c700: "#101010",
    c800: "#080808",
    c900: "#000000", // Darkest ash
  },
  accent: {
    primary: "#B0B0B0", // Light gray for accents
    secondary: "#9E9E9E", // Slightly darker gray
    error: "#7D7D7D", // Error in gray tones
  }
};


// Update theme settings with new tokens
export const defaultTheme = {
  extend: {
    colors: {
      themePreview: {
        primary: tokens.black,
        secondary: tokens.gray.c600,
        ghost: tokens.gray.c100,
      },

      // Branding
      pill: {
        background: tokens.gray.c500,
        backgroundHover: tokens.gray.c400,
        highlight: tokens.accent.primary,
        activeBackground: tokens.gray.c500,
      },

      // meta data for the theme itself
      global: {
        accentA: tokens.accent.primary,
        accentB: tokens.accent.secondary,
      },

      // light bar
      lightBar: {
        light: tokens.gray.c700,
      },

      // Buttons
      buttons: {
        toggle: tokens.accent.primary,
        toggleDisabled: tokens.ash.c500,
        danger: tokens.accent.error,
        dangerHover: tokens.gray.c500,

        secondary: tokens.ash.c700,
        secondaryText: tokens.gray.c100,
        secondaryHover: tokens.ash.c600,
        primary: tokens.gray.c100,
        primaryText: tokens.black,
        primaryHover: tokens.gray.c200,
        purple: tokens.accent.primary, // Used gray color as placeholder
        purpleHover: tokens.gray.c400, // Used gray color as placeholder
        cancel: tokens.ash.c500,
        cancelHover: tokens.ash.c400,
      },

      // only used for body colors/textures
      background: {
        main: tokens.black,
        secondary: tokens.gray.c800,
        secondaryHover: tokens.gray.c700,
        accentA: tokens.accent.primary,
        accentB: tokens.accent.secondary,
      },

      // Modals
      modal: {
        background: tokens.gray.c800,
      },

      // typography
      type: {
        logo: tokens.accent.primary,
        emphasis: tokens.gray.c100,
        text: tokens.gray.c100,
        dimmed: tokens.gray.c300,
        divider: tokens.gray.c500,
        secondary: tokens.gray.c600,
        danger: tokens.accent.error,
        success: tokens.accent.secondary,
        link: tokens.accent.primary,
        linkHover: tokens.accent.primary,
      },

      // search bar
      search: {
        background: tokens.gray.c700,
        hoverBackground: tokens.gray.c600,
        focused: tokens.gray.c500,
        placeholder: tokens.gray.c300,
        icon: tokens.gray.c300,
        text: tokens.gray.c100,
      },

      // media cards
      mediaCard: {
        hoverBackground: tokens.gray.c600,
        hoverAccent: tokens.shade.c500,
        hoverShadow: tokens.shade.c900,
        shadow: tokens.shade.c700,
        barColor: tokens.ash.c400,
        barFillColor: tokens.accent.primary,
        badge: tokens.shade.c600,
        badgeText: tokens.gray.c100,
      },

      // Large card
      largeCard: {
        background: tokens.gray.c700,
        icon: tokens.accent.primary,
      },

      // Dropdown
      dropdown: {
        background: tokens.gray.c700,
        altBackground: tokens.gray.c800,
        hoverBackground: tokens.gray.c600,
        highlight: tokens.accent.primary,
        highlightHover: tokens.accent.primary,
        text: tokens.gray.c100,
        secondary: tokens.gray.c300,
        border: tokens.gray.c500,
        contentBackground: tokens.gray.c600,
      },

      // Passphrase
      authentication: {
        border: tokens.gray.c500,
        inputBg: tokens.gray.c700,
        inputBgHover: tokens.gray.c600,
        wordBackground: tokens.gray.c600,
        copyText: tokens.gray.c100,
        copyTextHover: tokens.ash.c50,
        errorText: tokens.accent.error,
      },

      // Settings page
      settings: {
        sidebar: {
          activeLink: tokens.gray.c600,
          badge: tokens.gray.c900,

          type: {
            secondary: tokens.gray.c300,
            inactive: tokens.gray.c500,
            icon: tokens.gray.c500,
            iconActivated: tokens.accent.primary,
            activated: tokens.accent.primary,
          },
        },

        card: {
          border: tokens.gray.c500,
          background: tokens.gray.c600,
          altBackground: tokens.gray.c600,
        },

        saveBar: {
          background: tokens.gray.c800,
        },
      },

      // Utilities
      utils: {
        divider: tokens.gray.c500,
      },

      // Onboarding
      onboarding: {
        bar: tokens.gray.c500,
        barFilled: tokens.accent.primary,
        divider: tokens.gray.c300,
        card: tokens.gray.c800,
        cardHover: tokens.gray.c700,
        border: tokens.gray.c600,
        good: tokens.accent.primary,
        best: tokens.accent.secondary,
        link: tokens.accent.primary,
      },

      // Error page
      errors: {
        card: tokens.gray.c800,
        border: tokens.gray.c500,

        type: {
          secondary: tokens.gray.c300,
        },
      },

      // About page
      about: {
        circle: tokens.ash.c500,
        circleText: tokens.gray.c100,
      },

      // Edit Badge
      editBadge: {
        bg: tokens.ash.c500,
        bgHover: tokens.ash.c400,
        text: tokens.gray.c100,
      },

      // Progress
      progress: {
        background: tokens.gray.c500,
        preloaded: tokens.gray.c500,
        filled: tokens.accent.primary,
      },

      // Video player
      video: {
        buttonBackground: tokens.ash.c200,

        autoPlay: {
          background: tokens.ash.c700,
          hover: tokens.ash.c500,
        },

        scraping: {
          card: tokens.gray.c700,
          error: tokens.accent.error,
          success: tokens.accent.secondary,
          loading: tokens.accent.primary,
          noresult: tokens.gray.c300,
        },

        audio: {
          set: tokens.accent.primary,
        },

        context: {
          background: tokens.gray.c900,
          light: tokens.gray.c100,
          border: tokens.gray.c600,
          hoverColor: tokens.gray.c600,
          buttonFocus: tokens.gray.c500,
          flagBg: tokens.gray.c500,
          inputBg: tokens.gray.c600,
          buttonOverInputHover: tokens.gray.c500,
          inputPlaceholder: tokens.gray.c300,
          cardBorder: tokens.gray.c700,
          slider: tokens.gray.c500,
          sliderFilled: tokens.accent.primary,
          error: tokens.accent.error,

          buttons: {
            list: tokens.gray.c700,
            active: tokens.gray.c900,
          },

          closeHover: tokens.gray.c800,

          type: {
            main: tokens.gray.c500,
            secondary: tokens.gray.c300,
            accent: tokens.accent.primary,
          },
        },
      },
    },
  },
};
