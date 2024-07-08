import React from "react";

import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem } from "@mantine/core";

const useStyles = createStyles((theme) => {
  return {
    link: {
      width: rem(50),
      height: rem(50),
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
      }
    },
    active: {
      "&,&:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color
      }
    }
  };
});

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="top-start" offset={-30} transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

function Sidebar() {
  return <div>Sidebar</div>;
}

export default Sidebar;
