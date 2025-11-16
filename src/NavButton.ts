import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({background}) => ({
    color: '#fff',
    background: background || '#1565c0',
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: '0 0 0 2px #054b62, 4px 4px 0 0 #054b62',
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
}))