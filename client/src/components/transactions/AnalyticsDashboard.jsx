import { Grid, Card, CardContent, Typography } from "@mui/material";
import AmountLineChart from "./TransactionCharts/AmountLineChart";
import RegionBarChart from "./TransactionCharts/RegionBarChart";
import StatusPieChart from "./TransactionCharts/StatusPieChart";
import TopSendersChart from "./TransactionCharts/TopSendersChart";

const AnalyticsDashboard = ({ transactions }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} lg={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transaction Status
            </Typography>
            <StatusPieChart transactions={transactions} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transactions by Region
            </Typography>
            <RegionBarChart transactions={transactions} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Amount Over Time
            </Typography>
            <AmountLineChart transactions={transactions} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Amount Over Time
            </Typography>
            <TopSendersChart transactions={transactions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsDashboard;
