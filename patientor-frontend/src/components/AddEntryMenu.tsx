/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	usePopupState,
	bindTrigger,
	bindMenu,
} from "material-ui-popup-state/hooks";

import { useNavigate } from "react-router-dom";

const MenuPopupState = ({ id }: { id: string }) => {
	const navigate = useNavigate();
	const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
	return (
		<div>
			<Button variant="contained" {...bindTrigger(popupState)}>
				Add New Entry
			</Button>
			<Menu {...bindMenu(popupState)}>
				<MenuItem onClick={() => navigate(`/${id}/addHospitalEntry`)}>
					Hospital
				</MenuItem>
				<MenuItem onClick={() => navigate(`/${id}/addHealthCheckEntry`)}>
					HealthCheck
				</MenuItem>
				<MenuItem onClick={() => navigate(`/${id}/addOHCEntry`)}>
					Occupational Health Care
				</MenuItem>
			</Menu>
		</div>
	);
};

export default MenuPopupState;
