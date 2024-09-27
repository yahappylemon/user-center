import { useEffect, useState } from "react";
import { getCustomerStatisticsAPI } from "../apis/customer";
import Wrapper from "../components/Wrapper";
import NewCard from "../components/styledCard";
import { Typography, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";

export default function Home() {
  const [gender, setGender] = useState();
  const [approach, setApproach] = useState();
  const [firstLesson, setFirstLesson] = useState();

  // 獲取統計數據
  useEffect(() => {
    async function getStatistics() {
      const resGender = await getCustomerStatisticsAPI("gender");
      const resApproach = await getCustomerStatisticsAPI("approach");
      const resFirstLesson = await getCustomerStatisticsAPI("firstLesson");
      setGender(resGender.data.data);
      setApproach(resApproach.data.data);
      setFirstLesson(resFirstLesson.data.data);
    }
    getStatistics();
  }, []);
  return (
    <Wrapper>
      <NewCard sx={{ width: "100%", overflow: "auto" }}>
        <Typography variant="h5" component="h1">
          Home
        </Typography>
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
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: gender?.[0], label: "Female" },
                          { id: 1, value: gender?.[1], label: "Male" },
                        ],
                      },
                    ]}
                    width={350}
                    height={200}
                  />
                  <Typography component="p" variant="subtitle2">
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
                  <BarChart
                    yAxis={[{ scaleType: "band", data: [""] }]}
                    series={[
                      {
                        id: 0,
                        data: [approach["網路社群"]],
                        label: "Social media",
                      },
                      {
                        id: 1,
                        data: [approach["親友介紹"]],
                        label: "Referral by friend/family",
                      },
                      { id: 2, data: [approach["其他"]], label: "Other" },
                    ]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    width={450}
                    height={200}
                  />
                  <Typography component="p" variant="subtitle2">
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
                  <LineChart
                    width={500}
                    height={250}
                    series={[
                      {
                        data: firstLesson[2023],
                        label: "2023",
                      },
                      {
                        data: firstLesson[2024],
                        label: "2024",
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                      },
                    ]}
                  />
                  <Typography component="p" variant="subtitle2">
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
