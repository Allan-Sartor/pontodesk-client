import { Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { RiTeamFill, RiTaskLine, RiLineChartLine } from "react-icons/ri";
import { AuthContext } from "../../services/contexts/AuthContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { user } = useContext(AuthContext);

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        {
          user ?
            user.admin === true ?
              <>
                <NavLink icon={RiLineChartLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiTeamFill} href="/users">Usuários</NavLink>
                <NavLink icon={RiTaskLine} href="/calls">Chamados</NavLink>
              </>
              :
              <NavLink icon={RiTaskLine} href="/calls">Meus chamados</NavLink>
            :
            ''
        }
      </NavSection>
    </Stack>
  );
}