import { useEffect, useState } from "react";
import { getCustomerStatisticsAPI } from "../apis/customer";
import Wrapper from "../components/Wrapper";
import NewCard from "../components/styledCard";
import {
  Typography,
  CircularProgress,
  Box,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const theme = useTheme();
  const [gender, setGender] = useState();
  const [approach, setApproach] = useState();
  const [firstLesson, setFirstLesson] = useState();
  const [error, setError] = useState("");
  const isSmallScreen = useMediaQuery(`(max-width:${500}px)`);
  const firstLessonSeries = firstLesson
    ? Object.entries(firstLesson)
        .sort(([yearA], [yearB]) => Number(yearA) - Number(yearB))
        .map(([year, data], index) => ({
          data,
          label: year,
          color:
            [
              theme.palette.secondary.light,
              theme.palette.secondary.dark,
              theme.palette.secondary.contrastText,
              theme.palette.primary.main,
            ][index % 4],
        }))
    : [];

  // 獲取統計數據
  useEffect(() => {
    async function getStatistics() {
      try {
        const resGender = await getCustomerStatisticsAPI("gender");
        const resApproach = await getCustomerStatisticsAPI("approach");
        const resFirstLesson = await getCustomerStatisticsAPI("firstLesson");
        setGender(resGender.data.data);
        setApproach(resApproach.data.data);
        setFirstLesson(resFirstLesson.data.data);
      } catch {
        setGender([0, 0]);
        setApproach([0, 0, 0]);
        setFirstLesson({});
        setError("Unable to load statistics. Please try again later.");
      }
    }
    getStatistics();
  }, []);
  return (
    <Wrapper>
      <NewCard sx={{ width: "100%", overflow: "auto" }}>
        <Typography variant="h5" component="h1">
          Home
        </Typography>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Grid container rowSpacing={1} columnSpacing={4}>
          {/* 客戶性別統計 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!gender ? (
                <CircularProgress sx={{ alignSelf: "center" }} />
              ) : (
                <>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 500 },
                    }}
                  >
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: gender?.[0],
                              label: "Female",
                              color: `${theme.palette.secondary.light}`,
                            },
                            {
                              id: 1,
                              value: gender?.[1],
                              label: "Male",
                              color: `${theme.palette.secondary.dark}`,
                            },
                          ],
                        },
                      ]}
                      slotProps={{
                        legend: {
                          labelStyle: {
                            fontSize: isSmallScreen ? 10 : 16,
                          },
                          itemMarkWidth: isSmallScreen ? 10 : 20,
                          itemMarkHeight: isSmallScreen ? 10 : 20,
                        },
                      }}
                      height={200}
                    />
                  </Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    color="primary.contrastText"
                  >
                    Customer Gender Statistics
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
          {/* 客戶來源統計 */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!approach ? (
                <CircularProgress sx={{ alignSelf: "center" }} />
              ) : (
                <>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 450 },
                    }}
                  >
                    <BarChart
                      yAxis={[
                        {
                          scaleType: "band",
                          data: [""],
                        },
                      ]}
                      series={[
                        {
                          id: 0,
                          data: [approach?.[0]],
                          label: "Social media",
                          color: `${theme.palette.secondary.light}`,
                        },
                        {
                          id: 1,
                          data: [approach?.[1]],
                          label: "Referral by friend/family",
                          color: `${theme.palette.secondary.dark}`,
                        },
                        {
                          id: 2,
                          data: [approach?.[2]],
                          label: "Other",
                          color: `${theme.palette.secondary.contrastText}`,
                        },
                      ]}
                      layout="horizontal"
                      grid={{ vertical: true }}
                      slotProps={{
                        legend: {
                          labelStyle: {
                            fontSize: isSmallScreen ? 10 : 16,
                          },
                          itemMarkWidth: isSmallScreen ? 10 : 20,
                          itemMarkHeight: isSmallScreen ? 10 : 20,
                          padding: isSmallScreen ? -5 : 0,
                        },
                      }}
                      height={200}
                    />
                  </Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    color="primary.contrastText"
                  >
                    Customer Approaches Statistics
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
          {/* 客戶首次來店日期統計 */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!firstLesson ? (
                <CircularProgress sx={{ alignSelf: "center" }} />
              ) : (
                <>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 500 },
                    }}
                  >
                    <LineChart
                      height={250}
                      series={firstLessonSeries}
                      xAxis={[
                        {
                          scaleType: "point",
                          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        },
                      ]}
                      slotProps={{
                        legend: {
                          labelStyle: {
                            fontSize: isSmallScreen ? 10 : 16,
                          },
                          itemMarkWidth: isSmallScreen ? 10 : 20,
                          itemMarkHeight: isSmallScreen ? 10 : 20,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    color="primary.contrastText"
                  >
                    Customer First Lesson Statistics
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </NewCard>
    </Wrapper>
  );
}
