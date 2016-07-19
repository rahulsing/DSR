using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DSR.Models.DL;

namespace DSR.Models
{
    public class DailyDSRVM
    {
        public int projectId { get; set; }
        public int dsrId { get; set; }
        public string projectStatus { get; set; }
        public List<ProjectPhase> phases { get; set; }
        public List<Accomplishment> accomplishment { get; set; }
    }
}
