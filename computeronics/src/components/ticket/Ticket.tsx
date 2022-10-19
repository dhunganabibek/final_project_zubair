import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

function Ticket() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        pt: 4,
      }}
    >
      <Box sx ={{
        width: '70%'
      }}>
        <Typography variant="h4">Describe your issue</Typography>

        <Stack flexDirection="row" marginTop={5}>
          <span>Device Type</span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            fullWidth
            // onChange={handleChange}
          >
            <MenuItem>Desktop</MenuItem>
            <MenuItem>Laptop</MenuItem>
            <MenuItem>MacBook</MenuItem>
            <MenuItem>Others</MenuItem>
          </Select>
        </Stack>

        <Stack gap={4} flexDirection="row" marginTop={5}>
          <span>Issue In</span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            fullWidth
            // onChange={handleChange}
          >
            <MenuItem>Hardware</MenuItem>
            <MenuItem>Software</MenuItem>
            <MenuItem>Others</MenuItem>
          </Select>
        </Stack>

        <Stack gap={4} flexDirection="row" marginTop={5}>
          <span>Description</span>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Enter your description here"
            style={{ width: '100%'}}
          />
        </Stack>
        <Box
          sx={{
            mt: 10,
          }}
        >
          <Button variant="contained" size="large">RAISE ISSUE</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Ticket;
