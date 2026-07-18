import React, { useState, useEffect, useMemo, useRef } from "react";
import { usePengguna, useDataTersinkron, useKoleksiTersinkron, useDokumenMentah, tambahDokumen, sinkronDirektori, kecilkanGambar, rapikanTautan, keluar, pesanGalat, hapusPeriodeLengkap, hitungIsiPeriode, buatAkunBaru, useAkunSaya, lupaSandi } from "./cloud";
import LoginGate from "./LoginGate";
import {
  Users, Plus, Search, Pencil, Trash2, ArrowLeft, Phone, MessageCircle,
  MapPin, Stethoscope, Accessibility, HeartHandshake, Calendar, Camera,
  X, Check, User, CreditCard, StickyNote, Moon, Bus, CalendarDays, ClipboardCheck,
  Clock, Link2, GripVertical, CheckCircle2, XCircle, MinusCircle, UserPlus,
  ChevronRight, Armchair, Navigation, Compass, AlertTriangle, Crosshair,
  Landmark, Flag, LocateFixed, FileText, Send, Settings2, RefreshCw, Eye,
  ShieldAlert, BookOpen, FileUp, ImagePlus, Paperclip, Download,
  LogOut, Loader2, CloudOff, Link as LinkIcon, Scale, LayoutGrid,
  Tags, ChevronDown, Download as DownloadIcon, Smartphone, AlertOctagon,
  ArrowRightLeft, Home, Map as MapIcon, Route, HeartPulse, NotebookPen,
  Activity, Thermometer, Smile, Settings, ShieldCheck, ShieldOff, KeyRound,
  UserCog, Mail, CircleSlash, ContactRound, Lock,
} from "lucide-react";

/* ============================================================
   KBIH IBNU AQIL — Manajemen Jamaah (Prototipe Pembimbing)
   ============================================================ */

const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEECAMAAAD51ro4AAAAwFBMVEX///////7+/////v///v7+/v/+/v79/v7+/v3+/f79/f79/f39/P38/f39/fz8/fz8/Pz9/Pv7/fz7/Pz7/Pv6/Pv7+vn2+Pby7NnY5N3j1arI1c3kuVLatl/UqEHAjyenwLOLrZt3nYe1hSB1i3VYiG6NcjI2bU4LWzMJUiwEWi8EVi0EUysETygDWS4CVSoBUCYBTSQtQS8GRCEDRiEASiAARhwAQRkAORQjLyUALwwdHBsSEhIKCgsGBgYCAgJ/rv62AABN5ElEQVR42s29CV/iShM3WmQjoScQh01kUEAwQUVAZRkd9ft/q1vVS9KddNDz3vu775NzRhFCln9qr+oqCGhzffwBLr2EQGwQuEG++a7r0y6Ohy9pf/m2z19B4ON/kH8V341c9Zf8xcR53Pzo+E2/iUcAwNcNaKjv+hG+w3dzxXX5xfmK66ETy888/XN1YW7EPxNnL77t0zeBH9dV56BrMI6c71tsXmB7V16bw08EEf4M+QHof/5RVNodfH7GKAo0HPhR6O8GnsYniN38nn21o0NveeIdPyjfFH3kWC9OewTqT7pbDgJep+8W903vhK74WGAHOj2YGz3sVis/Kn/aLXlYujTf99U36S9EwnXp8kP6Ij98K6IdfHljLieA/GYDT1IK3VUzAIefIIfT44dwXbchyY3j7YFvXJ91k3cMxcdO8afvShCCRul2HQV5RL80cmT5K3wujsDLF48I8XDokiIDffPAJcKWZB2VPoWCLKP8Q05tnCiAKIq+h/s5ftT0jedu29zK1asveEik4Af1myB3BTBjZTgJhAZnYBdcDhX/kO4LUfTkRfGvF7TsGQylngb/0I+CXJbIe/fVqyY9C34UDcdCeiioqsRQCLkyBPlB8q+0ynRvbqx8VCG2GGu14pjFrBX/ijtxh9GGL8T/rQ7r4GcsTmLcq9j4Xi3ag/amPVgH98HX+K/D303EH3gIfJ+/HbPkF30pZm36QJwIf+CbLRZq9FK55HoCkXSa79CAKnj133eCiC6WUPzf2IJOr8uCkkr6HoRAqjdJKYU8ZPq3rbLGZUnXpVPHw9H/y208Hv1/sF0OORIdgUOulSEowQI5iYAGgs7gpko3IARNY7pRkuAJh6PpfJmmWXYvtgdjq76jf5i/epQbvtLeox/iV3VH7afY1o+rVZaly8VsTEj87jYduxA8Qxh1ulBHUUfADWKGCEznabbB7en+/8/tSX9JfzzRRiBttrv9NltORygqf9fdvfWeLCAw8w2oSJkOEs94ntLtIxE8bba12078tGx179dte/6DtvxFacNjPmQPm90OcegDdH/0/AtVf05oAFR0BAM2XT5tnrLsabt9Qiqcz/4Htvlyma6QFO6zzX6XTocQxPlz82pvLleEPrfZ2A/FaQwwRSJAEthu0uV0PPz9P6MdSESlj4dtlm336dQhYnB/pB+8eu63GVesBaMlQbDZZXMuhcBN+v1et9vtdOVGf3R/56974o1u0usk8kP6oIP6rPe710vonTjGj+l//LyDn3UT8bUe/sSX+EEsDoEf0Xu0L35VHKnHf/R65HVBdzxLt7t7hGE5ghZzo/PPFQrVAdo9G+TPTGYA/HuWIdKbTTq7pFP24jDUrCzvPBtGKFMdpcDEdzwHXQmS5WQEOzUX6/N/zdJ7ET+1sqXdZtCMe72AJHa6xWvcZzMkBrf+gphmEqD7URaH8kNmkELkBV0ig3tkBOI56CYlWaq0swO5FmbMdEXR0Ef1wozzADjCCRXO9RmyPWvxKKndA2JY1BNPRAzd4IcbWHRCdYuCHozTHZJBNiMImE3zQK3ZzX1J6YcwUzo1g+EQ+ewcI5ap1LRjzJ3DHoPuLNvd3++zMXQd3zSRztsJzH4FAOJv+A1TBOB+h/hCL7TqUag12Z2Gl3snTD8s0nUflkvotywXBfAzkij/jcJ6tNxvsu1qCr2KKrC+ARa3iV9jsT+62wlMH56yzeMstFBBEYEAO9KeIPjyEyEm6cH06WkKfQNAMC02qIfBBkijiZbCbLVF+T2D3w7YNaMF9NrHSqaEi+BOSQcjgTVjunSm8zuAjYgLL6TqjxZhuD5MH7N7PG7fkB5R9Q5Bu9Q63s2vIIk58z7sZ3hg1272Qf7C1diqxlTEg3RhiiJxm45y8vqeqyCwhui0vxsBC2HKbWBi32ZwXi5oYqdCCVXF1IdRus8e90hkwhCoYS5mv/rKTbhdGD/cZzuBAbPsfF6qMvME+c06XaRa0jf32VM2hU7HCKZ8Z7YYbr3FKuzCcLm/f9xNUUdE53iVwjxwRgTxb7gxjPAqt+kQul75MMzgCLCapoyVvsDP6TG6zK1yhzYzsvhFLMo7c/tQEzKonDjsEAooHceQ6BKv4gp4zbLYZFCRFYwN0022QTroejUUUOt1mTfAlOAlSx01+jjdZsITxJ9b1Dsxq3dqbeJAU2ms+lECQ+SIXToMWmCXfxVBWL17GULuwHyHlDCCjq+surpwHdMelQP6YcrBOdaE4Rwt8MI1Rlt0ito3cEF/WmATC2BQBcuNzdJd+QmS8DbbL6X5xmr1gwt+w2L45AIHmWGK1/owrpeJJh7MjNxYSQQ5Ae26LYkDLUKwIWIgqMuRb21rWk7L6oRT+BvGq8eHg2Yu2GVCzinWYJKDRu4oe8i2szMmqGdIgEg7RGE25ft4boDcitbMVpKBREGwRDbrC4McDLPFTrs2hint2oPZ/n6djbhnXR8tq/Gu8p/IDNtsu+x1msH/0QZ6soOnVhL0cuZZwQkaLWRP23QMprYE+FY7GCaAcT9hEqJwPCwhPkvBAGeUQxChx0AXNxISVudUSoF4uJ1hjhLmDUo5xAyGM8EJVRBIMmykYW5c4A+ghgpbUrKDNNv6cTeG2BowAZHdg1qi4LcXOsstZ4ZmxRJW2duIEmY/iWO2EIIYHBQGigyeeKBwszHiiNtsfgmciyE4nwqxpgmrDHF42Kf95rmoin9W66KZtCELgQXM8KcCPe3jFbRxPskRoTwcU1SGbv1Jhqiz3XK5NcXDjjzVoPuNNfAT15o5rU4/3ZNsTM7cqG/kX0Fm53KecpYIAhld8E10Cl+EtR4JfxElJA8f1A0L6+Ap26fDIZr5ZlB5m04ZsKRpM5Ksvk/VhmVSEiUw3q/2aa9VB2Wz4kWWQ4ooETbpb2bTTFD/YCDgsoLpdjAaR6M5+vnZk8KAYEAMUASMso2JQrZBGFBCxt+EyutNYd1EWx4etmPoBIVBURYCYFc3QPUCCVcNU/599q2WkkaUUzBvUxdTw1m2exL24ZNMFwg7MSFnZ5uVUgwoIVFR/D5P+qyeS0BJ4w6Mdw9oMXUsgSuoAAxVDIcZEsKwGdYGcqCsNIg/PGkvyhynR8ZROE13XBg8qQ0x2OzmaBcwZBRydnJzQcHwsBhBYaOx78WiHauwm+7QVoCyTZfvzvMOYOjX3Nl3KYrAVUNUZ7R/4z9JkdHnboKgeETh4eFBqIU9GcoxHsRn0J8/bEwDErUol5Bxy4UfUH2tO0yBgP3qiLfh1xCy4+dRzvLjRdMO0MsTECqovP8iqiEIyfdoojB42gqVoLJmiMKGQnUdec1xQFGQp+ypJBp26VQjhrNY1NABOETQO/Ig/NoMI0hTvWpN4pfTp22NtWWYy+c+70I8y9BjfnoQ9//EE7X3T5wMehKDyA+RJearXTntmG3IeGp2SuUTZ7RFTg0FSSSwPG5yfoCfPUMQ9UOoG56y3dTpNb/hwzyIpvvqwEHoOGgZECc8EQgPggie7h/2D2gRsY662IijRbsqAcl3w29xngis3htYfQCous09Z4oGk5Dv3x0CcouIH8jpwoxzQ8uraqhIZSxshi1o9lqf8jV4Sw9PWtZ+uyXJ36/a6CDFJ4fsSSiS7IFiWozVCudv5WYLLrPNYQHdsO57UNG5yvZEBbt9SrtWsRM1g+9KQlwKIY7S3cO9YAMJwdP91mT0wv/3OzF3LDZZrkK4Rs2QGECTa1XbAc7hAD4Llvt9GpZccQ1QcO0M7ZJI2GzmZ+IIwZmoHxoaiUjbaQA8cLVI1mDcrT4IxxMu5izbb+7vC2K4l0K0731rQhuRvEgFK6EL88M2G0LL8Wq9L7BhiCCMsntuMn9jtbE6VkDlj/I+BwFv636zT1Hr+d1axqScAVmWT/cFRzxQmBflaNw6n2JnNXFUtHynh/UaecoUH6w275CTQpfbzCJMyX4QNCjpr66I/CtxyBkBVQJP4tlESC5UKew0mt/v7oVo4HoFfYwNhWLjqoFu8y5LsSY0Q8brzV4EmNh3Gp5p2s2nZAOFFuNGHRFAif5yCxF5qQPT1SbThcE9yvk5moDd0GvUczddcyi8za2oyXniCoW+vhxCUmscFSlkVo0tULBRRtngmygVaBrWowTZFm1maMKPvFZTHkcw223uyyphRCoBgu8r7FhCRqZQFJKR7oWz1f+RPijFVpoo3nYHHiIESwTKMwwt7bCN4DdqyKc0bP7Qg2G5oYlqIWjO93r1Goo2HjjrcasNvg0RRG6nA8ksRadTmhaEBc+B9a1f+O4xQbo/zL/Nn5UO5BNTz5ESAE01VjJJzz0CcMFvQR/9oSedDFAYDCDpWA2KmsJilBzD+f32PscAZeQ2z1oC6IFY+ObmYlgSCEmoG0LlmJXNCO3BfLdZgo3tz+XtHJf5lPrRyxZ5MN1NTKAj+bMRBhFrt6MoCouQlQpBjFNUl0qwoOFEOeHf52Q65CkDMAIjCAJaSy3LA/f9yv0zA4TtEth5YVribjdwWk5fw4Cu/kBuQt8S7I/aePNF7ZXjhxftqDDrfFQUCTkegg6eOJ6IQs8xkz2KUFnxXEtaIxEg5GI1NB9FfaS5h7KNu09wxlnL//BUmpLFHYMO7nnhDOM6vsgho4PZDkVh9GA4vKRtOBxccCgQmvzoSUDZZa1ElqPQdevdB+vj6ggQOrzyqrq7W8dWaLXMtiYlnJM+nsqvIQHts/tcHsjsGomWXC34YdgmAMLh5dXV5E+xTSZXV5cD/MRvh3L3Zhf68zVKBlkmTBwh/UGoca+dKqsSJewXuoL9Nvki3qyCENQEoyKRY+XEgF7XPnu6V5zwsEelEMet0PWL74U+AnBJt3+N2x/xi16Jn5OryxAgijxRfB22YJxRJDaHNR02YjPt9Z12UCA0rXftulBXMiZBiINqbXgUlAJq+KFYuNOlkhZNNx7RwOk3/JZz4eXujA8XRAFX+NSJCTg3XAlI/ghECAckhxAvrxW4v/qUtcvyo2b7ZdIJLZzMpb7tZlhHgBA7FmPdi5ygNstVUAJodRPNSK4M0jwPVTvqQgcfWlHDfv+0mzuAdk/gXF422srzvOASwCmXpA4QiT/XCog/k0uUECE/cdRHltgV0N7v59zugVIdhEaqphvBYhs7fJfWIdcSmXtriSt51uiO49JawTAcplt1sY8PJA4YP3E4uQSV5nEGw5AeWfsCVUNIG/68uAgdAYSkB/w1ubqAMCTvl6Tz7HVdENiuiJCcq2HKLelcJnhRrUygCIJZv+oQJXAQmtxUKlw1p+wDM4mMh24BLHdZjsEO5TjP44b+xZ8r7/ISQlG4gHKvbaSveX11GLUJnOHVRIMBoN3iMjSB6XqTE8NWD5ZBiSUs+l7aCXGgMihgBMDcamRJA2FjtxNqjEwuEHKaJQx6ArO2c3U9mVx65QpHvxSs8t12G+BCwHDNYbiEyEN4w1YfpihwxfqQx/v9stn5kYgX70sVmbAaZQ/lcIKqLJHs0NHCFfXRTYdMm2CUiYf1yB8WWrhMBuEunKvJECLtlK3yGR3g3qrH2g7CICBAffGHeIIvxiQU1vzQBMReZRfhfB0ZmMaSU/7IE9rBMLaMcD2nhDg/CauzVkVdj0dw3xfygKx8xTNtuLyCizOOh6cfEI2I4ZXQmJIYGEMdhiisH+VKoIdHs/Kilk7FPwWCY3+G5CizijcmUiYlEKoP3yggQmbYyQf1+LAmXvDyj8PG1RWaiFAfMs+XGQoYAC7/XAsZicQADI3rhk8oqNVQlFiLg9YPXXsJQqdac+Wdiyw5ICkhrAnKeWZlThCRZlBXSOK7V5Aeu4CriTzSdzUXErU2DAQxEFtc0Xph4Ebs7l6tCNuOkbbgfDJAickOLA7Sd2BGNZFcy1rrPPRySrAKHlbKuSYwP6hFalRO29UCDY2gMfkzBP0hlLIDrHIKfPaSJfDH5ALaCEILH8xeAU1lE61vnYci0kpeZGVXT7jVEATVCCWgmCvYAarBmJxgZJWG30GpmC/bO8zz8/EbbIRX6BgMinUaYA136prG8b2Is4SwpScDiPwmmn5dKlOVZylVk4HmSpeutSNA6FSkEhmLLV/f24wcFJTA2DemOR6FS0VFB/iM9EMhM9DNXEH7v4XG2lIwcFoYuPRt5l3mTLdLh99XkzF1L5wd/Bo1UldHH1XYIagWiAeqU0MCo5Vasklp8I6uiiNnwvX+wAlN17+QqyXjXZaZXGjiEQmJSpR7MF7L06yQ6ZKzoe/8nXMgOLyYs+Y4ih1arW/SXbRynAiBr2p9XFNleVe3RQCtZm4DDitSFvRKAQu5XeQcgSiEYcMTD7UghbP6AXR1f+QWY1U2Rw3faPrBSq60sBibrTqikZKO1jU5o0xJxcNSuqy5IAyBgzAhSghYTZzbYno4gRciCtLjRnYKKewUD9OdPNfBTCXUuxEShMQSVIU8FGJjcxlei1m98BVugxM4He3xoBXDAkPeeyApoRX651oSlLGmGEWbdIQIOyAKFyG4CTLEAxIc0Vw6ELKsxNysDCiBcFxoaWkw7XWwBqmYdy7GWDa+WzDMtnaZzZuJxEImDP3wp46IKVUlCNdoOwL5xfP9ioPwmOfby+sZwSSuRICQ1BgpLtR51H0FQkvLBxi7gjIVejDdF3zKwqJBRtBwAzdyrvgG4P3UxCs2dLMnMuaEotXjWQ2qUlWsF3+DIlPscOTsABaaJxBCM0gl7tL1FTsEPygR6eRsKqViUfnkgwcUNppMJlfhN+kOsJClS4pSBt64liWGmB0e1o/r9WPhUp/ve9HLQbDHlsGsc1bS2lXsEFYrF8tV7AlV1ItWBoe0E4eRYRqG3qWMIV5fNtrns7lgWbQXkFhQKFxCm+Kow2yHGCAKBfM59vuHQKeEsMYkAHuFA4Q2mcAqhpXjUbXu/MBRWK/3lMU2OB9IzU0mRAl/LqUnaXsSrBzSKPwIYggJwh+0Fly/i6SweuQgpCGLvqlT0CnBc6oBNdcNynygDucodvBrDDy1uxt5v9P9iiBYHdJuedcGusX5dglFldh3qbNiyQwyRB6PJoZwWjkprFcjybCunbxMSrB68Y3AgZrCXqevyQQwRQIz1tPEaC2uOR2sD9PS4hAgRa+4ASX8pTSd82P8SF2E4SQ/xNAJuQV4XHEMkB9+UEojQejmT7tYd9qsBOVU2A3EF3dGyL1k1HCe91D4UzU9vyLU28NSVRCPrBUg0IP0yhV232tKkxQiN4obo5UghMPSDDaC9UKTghLMQi1QRXehLa/purpMqFU+Dl8yuDw8iiuaVygu5NevWX1tBv/JTqiQwqWPOFLklMOwy4bAviOpyNQOevWGlMiOvcrF79pVZInjKbmHDLoWm/Cc9DKoRkD5hFwmXJSCErUL2E2pUZDCNeFIcW2qQuIojGvSCdpab107WAG3e5HNPCsdf8O6PpmxYjukrOrbhs6wSDZeQuj8h2ygJr0GuWT5MwBRe86R50XL31YOVECwe0FgjSzplGDVpD7x2/SQC6m+X7kWfygya9xQQLnoWvr51NYhgrRTcxeCs9QFSeOFOOtxWZdY0g6RC0bf9gjc2m4Ebr/CDoWnqZGx21GXU6grM4A1/HM1uR5eoMXIQfhZCxtm2mShxg8TFGPQcSQ/oBPlsjKAzG4xdrkUgPOrqwxGzH0HW+aziL2wCFIBwiHt+61K0DKE4fXl1fUAJpNhriErPNMyrx+Y7gy2kBa8C000QuRTQdpOSMZR6aBQzSzklHBeJlfWSntlixHAUqXhQIsqw/gzOc6ri+YCv9EQIIQchEa7GsNhvyJ7W0ktzNQqbOdrzg9NFiwJ+x0ZqZ3SV1jZHOrWaIfv6FE5UJ2mdUlIDoJ8JLtd1VKS3xheIztEMPlD7BCC6UhGSYSoJiw4Uw7D6zqQH/7k/OAFDlknRAjr4/SbBjIe13SGncB/ayHCuuVMkWSH8BvgpHLYrXerskdHvBy0hIq8FD8HrsFNjFh0NMYfia6+yiU1ZMzAsNAPQ/RMUR4fBQFq9Yl110kgnBb1EtSql8nC79uCKmCxSKevghDSvoXZo6DgZR4691QWOmAJ9UUazxbvzzPqG9djbmBdY5UHKjVTgYx1pEA871HWJ4LJUKXqXA5CXA+CUwonyMvvfxNZEhlIVCIkpulilrIa32Advz25Kexmyh80XMEGv4gIpotlunz/+Pi7HHeJHFr280SBUyhJAUIr6KUHdV4bbio75AWG2VxxXT3kLfDttNTo/cRiFOtwuYBCsoyrBosfXpsg+A3kaMYbOvJ+jmm6+Pvv37/Pf5wcEIcaq+RCA2HS4AmV5VGCEAeBtZNAxViySR2P0lAVNx7E8p/cbAabAs0Pwh26nZCLPb/KM/5lLhOoTOeiFUUkCfrj2TJ9JgzSJYHw/v7x+b6kXl6sxyKnDIRrWM7caKQb4yCkwGojNbzlEAR23yE3iWwhfxFEztmhUdak5UQVerXUJnFsLI2wPUGKmrcHgg3SZwEBgvD+j2/v/z4+nhckJXuJZtqptWKaT06WAjpF0xwEdj5haoBQjae6jVqj3ZQJZ2o+uWu/2xfKQU9tRBfh1Y3YiI4v2iQLCQGx6SBwGD7feWu31oAZJq7rR5p6oLBzwH2o3SsHoal706yiIg12qMLkelCT1M5D7qF3bkE15W35A3ml5TWWYyElSASub24mSASzHAGJQgGCJIe/C6E0jeqehqOBgJIxilE3715fdwY7aCoCNP6VlBBXbUpmCRVAHSXUaYiQg4DXckiHUCpp4S8kCIQDCoXp8vnv8zkQaPv4/JdyKdkzRNXAAKFFAa1XAUKrxv1gmmA8kZ0Q2bWcXxvuUyC0bBAxI2iz5tfSd0IVYy2a87io2m6QBm4mV8PRPP1rQkAgPFdA4DggOfSQHNSSf7TqBrqhENFyltXhlbNDGH7jnysQco9Ea5UAmpRgFmYvU4IFrLArQHg9poHfqu4ZISXcEhGMpsu/72UIOAxcO1S3z49nWi0k+gdQ1kcDgcpe0IZUILCzxQ7igZ5+YDFWA8BF3kEJClutN7kYHIRTahccg/gKIRgvnt/f/9JWhuAZKeHDisK/jy+hNH8lDK0ZR2MHAoFyfwqE1tkH5SlKiIvmRVCTUSp9PdGNpfpuXwjCaS2updo2zQ3RKrpAWfguIaii8LyYLp7/fdXg8CmVZtJsNzXBOHHCkAkQXkkmMJkzsvRQ4+k0jR1YNQXuunW6r9G1qUiwyM/ZaSeuJWyVPekm2YVI7gUEJRTSBRpSf/5c3z3/qyWHf1xpth0DBMYIhCOdGD3d8LwXGSUVdvhuUVwhTAiEVuAH57QI+g5HAULbbZos6cfBaEF39/6uUcJfDQEqdZ9coWFNOPxFrWAnB5KSgWYxUnAJBePlikA4LfXMQ1Tldg8cSQndoqbp23gC6Nrhl3VH0CphpnQpCMIQqjguvgQCFRT+PhMCIk8rEzOTu+f3zxp6+FqAY4AQKu3wijfXt9QWlGOMBMIvS4GQZhnp9jSA43kW7aAnXRTnObQSVoCAxpIZsqT08eLz/d+/Cgp/ORHwpS45CAqHf1YcPhGEKx2EiHxpEsivp7nhRUY1Zq0QjJ5llVh+1dWVTd43eQd1JLyWFw7CikJ/BppujyjhXwmFd04Ear0P/lDlirIUw8oWSAlNwwchEMb8xKcpJA0TgoqL1NONJbD0kA2ssVaviDE69RF9mQEgqjy88Fgz6L1UFQj/chDe35/vJsayp+u75d/nO83d/vPn5u7946MKwkQHoY26eXri6I+ho8+zYdWaKgVCR3SFgu+TLyoppWKM5wSvQ4U9nfT08vL6Qhfjm1SWgyBR+PcX2WDCq/gVAiQf0Yv+93yrk0OFLRCEoQFCyNXSiwC/YzycsOI/BVI7dIoe9lWZoNuQOgkJSoAzRVY+D27QxbycpqX8sOsaIPz790wIyAU+lJ28E65U+u+T3IW/d7dltvjQQdDkIs9f0I3heY/PQ2jSjSt/OrQ0hEiUTGj9PA0KmnYIA18PZRcihOWVYfyJvLzNoReV5ZECAV3DO4GAWuV09yxdqXR291e4C7iPKuPl+9wW2gJB0ETC9RAiWteE531BSzU2Lt2tpIQLmWAMydISSOBFlWScE7hnVsiWTPQOqQe6mjLrgALh45MkgfGUC0/qjgTj8wfCRP/+Pd+J8n5FLJItEASNGyYXPlrKSXqk08o4a2TLs0LhSguZ0KhmnkWdRKRiEWapQu8HrrTI16Dlxh9JqWIVODt8fBER/KFogryFu7tn0pL4P75SIHw8/yUM0DDigBXb9d375yeCEF4bGjKifAc/7VTv3lgTDlaU0DyfkK2+LVVkM9LLGcrFp9RhLCS6fHk5KgklPS0vAALhPb2ZXN/cqsDKLVpECoHrPwhCSiD8/fy8u76RtjMRzq0GA+6FIFze6HLxAhgSIJ01GwKr1JC4JZGnzOawYhflKtJub+dBFT+wLZNVkjGiRgsEAj2TpCyPZneEwK0Mr91yGvjL7YU7esopUcLk7vr56+MdP//zzGnhg1PPjUEOs6ubayO61uOiiJhQJ25dzGtLmqTFmK98sa61L9ODp7FDZDaS0num4vk93qwDyeAouNM3y2yuEAGJAdEAmgr4f7q4Q0og4XAntMP7+8fXM90d8gTiRD7lx9cnF5PSrPxzqYNAcjGRcnFqa5/k2l3pxO5pu2417SJeNpES9tu8Y5kemK/KX84PpzQhFVQciwqTbwUIhADXk8JYWiAIJCa4jkzfvz4/Pslg+vP8/EF2ExmNHx8oCoR4KIFwM+ERRpJEL0ctvFvbaFDTDvXSwBoNUSDE1TkkrnmUFtluUiiYfHPBQRAIcGPhWRL5Am1nFAFSR5Jm4Ld8i0KBsODi8Auth68vISYnEx0EGWY9Ho8vb0td79WWOuQgONUPodxjtuR07HcEglsJPJWpLRii0Yj8MHV6hiHF2QER4M7AxztZQ2IJx+Jd86nRWPrgG932BzeZ6PHfPHOtiTjcXXNKyFEYOoyu7u0FYSiSHcXjrE79UTJBs3ny1SdaCq6ag+kKEJpB5NQ5T1IUeygA3wiEUuWMjyCgvfNFmh4huCnMIA5Cbi0pEPj29++t5IAbfE2ffJKYvLpSyYsbciHdICRj/ZSGrFoH5tpiIwRCbQ4F8gVUpfb/fQECs9d/sKJtgI+SYPiMDHpaUepBk7SkIr8+EQUE4VmrZpSUoEjhn4YBCYO/wlC4+7q7Rlr45GISVaREAbkhpDbtSAevJ6NDeal9fvFk/SKoUg2sBkYf0ZJ4rYKgrRx1jeXzeE2or47Ht1K9BAfhC8XbHRpDeWK2AEGiYFACscUXNxxvP2/+/P26u0VrCUFQ2YubyUB4T29ECJ24pRclQ00ErNAOzJL05w1+yo0IDHZgVc/RhdA1hBFqrOHziYspo5ESB+EZReMdSv/cZPwWBIXD592f5y/kopvnLwThVoKAYtENmj2SQqe8Uqco3bIUlUR+kscTWKWNDtRSgoilC8FYxs4Hbh8XU4y9AKXCFKXCydQPFFn6QkmH/+kgXBcgcNMxtYBAkuAT5cg7gnBzc/dZgHB92QgD5owJc0HgUe7/oxvUhmG1/snr5BYjM9qVseCbjEVXqcgyTCjuyJ83NRPaLojCm1ZZ6ToeUcLnHWpJvAs7CH8lCDYYBBAIwvXdRwHChGrVGCxOL6dsyH4VbT4iQQdXVMFRrp7uluyE76YoGSpyu4RqMXroDXlGVIVVJLDIEMikAy2mAQIEMv0FCDlDLP7pEXi0lPlW3Pznh4KFHKpbnRIuG20InOEKCWEqipXyMgOn7aFOHvIrMPrvqJB715KmUz6RPZOnQKjGIcgGoh4Xjh/wEc+RK6p7UUG8aZEVan6NIPz74hqiDIIWfDZB+FT/PgWBoHZ4LyiBJALV1b8pZmDF8vc2NCa3V9rCElYKtCaW8Rm25t3qPdeTIIRBuXunz+Dy5nYypLM5Upe4fDkKXlkqmqj4HJqEawfaPlHd3eQoIAjvFhDUbfP7/yhw+fzMQbgeNmgp2DA9vqUDRg1XGiIq4gN6lsPJ7c2l0654x5R3eHsT7ACWbItXOy5YOlC/qr3XojZMSEIBvtDq3bokFt7GSpRGDakiFQi3JghFXg655ZtNgYDPOaLWVdO3YzbKM4QRr42iSsfb24m1ZrYDCwJB9l4r3XJUG15zlWBsBtUcY+ig6XKLpAkXGis12SB9e0ubzIgslUDgMPyfgnB7PaD10r+G6dvLWCvXdolFnSuKWnCRYTK+m4OQROcKHuGc76CFcAW3NJD7JnRNk0twLopLYR5endLdtIJxcBaE9/8Kwu3tJVw0XFLH3FT0pMYmdxUuxRXpFeRaalyC0NALWcxgkQ0GNyjbCYaREQ7pnpAYBsgT+efo36ZvaRKLGIQbWSkBjR8Jwvt/BUEU+aNh9jbjqTdPTWGHASeD25thUa+hpZ/dbkEJtoC5VlBfmkSlm82gd5IAqSB4pASVJYRtSZPU5niJCqIfCVO0AOGLQFARJgThQwfh42cg3F5fhF4QDVAAK3PEBadBXYmuBMKaaoCS4bdQgrEiCNxiOW/VCemXLUZjryiciPMSTwBrcyntIKkOli9DSHh6z6+AIIlBgfD+30DgS6XJdeIr4KgjketRgyrkBHEtk7BtD5pIEGL/B0EVsMgEi8fRIDXpKLdOwMBFJLhR04HFshMDiF63ZRAECn/uPrTsJILw9RMQKLwKUTxc0rAFVBIRNNpOAQEyg74Ct2B6l+zZb0BoWqUlGJTAKlxEsYLbAoYrvL4LMiIhHMB0RNZFFEQWEG5NEN4lJXx9gwOCMIFBy2kwGCO7OVGE0vCCd+e6yS9D71dSrjjVQagYzb6tNz4fd6BkQlmYNAsXgqtuHkJE2TDEZ3OB0vBXT/YldoMfgEAofAjR+XUWhOGAtdD+gsYQeQGc6MKnPm3XisNygdCqJCN5txMBQk3WwYeaZRauZIdQa0Mkwy9NwsH3hXCU94U/J9RL8uKCyMHzuZNpA+FWgqAVb3x86VsNO0DiuLRyAAVQxFvVhZeTG/EAcjqIaAmN2yrfCziJLhjhZyYCpyXNgTIiWKM+qZpGQQsyqn5L5EDSAbWUJ0S3FQRUddd3n3rVggmCVKkSEPEKKaExkCZ9GKI6gMur6xx+ZUuKDvYM+qPS2FJXmc2mTQAlO0Fbug+mA9UyYYthNCeC9F0RUr+RLMFvjsiB2EKIhxIIN/8FhJwqFCZUk0MLYEgQULvCnAI5KZD1GrrUfBi5eDgvR70pNvJGDpRnHQVoZmpAjzjYQODT1pY0P1M036X6+wIFyRwcB78dOprFqIOAFHOnF7CcAUHxx9fXEnqtgEyCAoEirXPLc1LkBoVdGKUVvZ6DUBdA0gMt2qJrpmWgNGJxaeQcjRlAa4VsjDa31W61G7wt6KE9YOP0X4Ud/hsInBje0zHr/SojkBMD2q0XPEhGs0KyrWrz5GqFW2VjqUZFloOUtgJv4PUIy+0GWSKmAbUut9qFcLLg0OJV7f9qQPj3M3YQ1d4t0bRT8V1BejfU+pQagLvdEFnh6VBZMssXv7+9ldZFihqL/AHbtKfnW0EQlVo013FKxfhIDOxCwnB7Y6cHwuH58yu1gCBR+DwDwadYFVSlAaWeyVK7iFwv6sZ8zDxNqemWqnZ8LZ7wXVIejLBUbal/lw9L29PsmqDHQtRb+SWWN4VDY7xYlGTCR4GCHQR6V6x8KA5v0oA8PEkfhowg5gzt59Bp6YE/KeQJhE5N0qWmK43D1YoItJqjEIKINakn7/32aTlGSoiZE3CRLZSWDYdBkxrxah//AAR874OX89I36wDm5jpKAzLTe9Pldn/Pp7ixUoEd7xTEKcEPzoxPtQyc9/OEbDmuRAtvdnKGHb/MXpeFbVpSdmm/XDIfnFhY+QqEj48CBSslvNNguKbjlLCV7CARCC9Y1O/xlXXplnfN3lnXy0p2iOs6zNY0mwLDgeIhZ6Ydc7nNaFDVZpPOx4RDs9vBR8LpgVdllDckB+Cf3pRAIBgsIPyl6aEOsYGFBK6vOJP9ukg6vSZHYJFt+cCg+z1JxSpx92q1gwQhsgkJL89AJZa6ZskQ9/dZttlv07kg27jTo3VeAojqpXPrAW/rRoHwUQvC39kQopaCzARAkAC0L3p9xk82nadbOTOJmCFILJKvBgQeHnHdUv8E4ia1cN6MJ5gwxDB+lBPcsvsnFEfLGScIdKEGA9LnFxbOIEHeSpDFb290EP6VQXhH/RvGBfMUbCVa3QMbDHohl5fj2TLbEhHIcSCPRabe5kUmtoi751qKNMCMJ4SW3oFU1TUT48vETMPNbn+fIhCXLn9Kg0EsepKXgSCV7uETFiAoFEyJiLIgbFUgICFA4jceDPhYDDai1aVPHIF7OXrwfp/3G6qM010I7eDY7hTAvmjH04IqUJeky+7VKFQBxG6TIWsIkmgIIIZlnTEZQrsL4+evzwIFHYNnGo9TgoAAQJHidMUUDCQAZIFsQwBk+SRW2ec+dOzZNAShZEQVzO/W91TpauxQWR3sBXFzsafJd4ocSEDcb7b7HZLEfDriSLR7scNFhE4QVxcwgP7i4+ufQkEngwF+eHFVMTWc7kVY3P8D3v9TPo/3Sc6J2s8de5txUDHG2C3HmnNTuVg4xEp1jByE0pJ85XAxFs751C4xiYTPiBaEgbyxy5A5piPSCA1q1z+41EQlenz+gIhB0UIhEMeA9KMbFBMigVZbv/+dBKAYwyrGKu7nTRbWFFsomeA7thp1OYDIMBbECm1HskOriNSDEY1thTBDkcjHscgByXImKL0imiAkBHM0HRSVBT0gTwxgmH6VQFgOYUiptBysyzY4fA7EaIoC4F6/fzWMV/5AGpwBC2vWSnumdqh0SHGhbi1hLhNa9s7KPovJZVOCWTyUJzX9ia4Vgdhvc8VBfeonBTH0f1HxAjccJQYLSideFarkApyAA4AEgJBu6JhPaqSQJIInSQZ8fh6LajzlnB0im3Uc2Zty0l03e2beoVq6RRwzWu7VeBNt+JU2+wfJFy2J5WxELO04Q0Xrk0FrALMPjoIQBzMYOOFEMypyHbjnBGAe/umhgENMUkyaNSUHke+eN5ZCU45AbRpO/1yfzspnfYoJsQ/2DSFCisikaQmhJIdrYokpYcA96Y8pcci1NC+RDQiBefrIKcB2+w85yW33fBC3Z8skMeVF6glZa5+lSsAZQIKwr1/5wies+h1Gsz7324f7+4e67fHxYbV63B12iEODyEEqwEuUAFNRqvj1OcU/Lm+kLUFGBiKwP+zyUQY1AN8/7LY0gbLVCczpbXr3Al4twtmhVclEOjYHqpg43RUgnOvSEYjpjui9rDgO91YIxMZxWIvV8NIOuCJa+KIqrS+igysBAYnCEQJ72K8f9c2CwGa7e+SuZtfK0cbaxJwdKgsjo1Jb8QJGh5vNezPvYC2PE678LM12O50g+CQKbVvjLa3Wh2NGIQLH4W7BFT7+OdoLX3N8cSUEJo8LrAgB2dbucV2FQUrdh3Q2Vh0GosCpX8mg2OFsUKU080QFVQ77b2fDoQfmsh4lI0aoxR72+x03ZHUa4B1sH+U9rZAcKA7hcIuIUFhQFFVgQHkshGB3fF0XW4kWyBBBYbt7SJfTUQdlTO8HU2m60mJ0auyIc+1E6kCoEk+nGyh7Bkliz7HgV71a5ZSwVjAcjxSVgsvrOyo4GP79O2w7l7d3yAk0FvDAG2ntTBA4qHjzdOhtRjYpF7NBr/P9whzHbjbXroYrqnhcBUJ8TiJoBd8h6yVCraFlQ72D0LjbHw4Ix267RomwWkkcdq+73XGNOi3u4tMf+t54DK0hkkEzRo17QCrY8U0BsKZbP+CRtg9Zym9f2OTQ7Xa+q8Hjct/xofsdCHV/GiB834Gd/AkW9363xHyv38PReExoEBzr/fFIcEgQXvHFcYUOM+qDmwHaxb3BzQ3qhOF8ddzR4nPRXg/vnL62oltfzmd485fDpjg663U7fCId/KQYUdYnLCGxLY0I81IFcC2BCMEOTKcSKLVMhzxq3VT5atZJur3Ezced9RAOQRur/fF0PLxyIF6Ob+kInMH1BC4uYHI9cJAT+IrXHX56wB3J6l7greOD7+QHC7r9btKxz0KuH/f7HTvY+yc4ctEHgRDqxAU1oeqq8d1qxd1ev5ewfAgcgYFYrA4IxCstElnRdBya+nU1QU9l+nLCd/H+j8cVp/rLYX7rYdKnQ8WMBd43MqDUHgUqrjT8GAQZXiN2cKputvtdS8Mo8ELxm3taSa/b7bUUFCg8V6e34+tqd1qQ03g5vIJmf3F8fUECOFFIQjI9Sv6Lbjcp1xCCV392NR62tBA4OR9jDOpWwymLMbTs5n5jmxRLAszYXdLrMZGOQSDWVKKdDsEZDmMqdaL6cAKA79Dp97rOILSK8XPtbS2r2hwIGh0ThMp4ttpOGlImVKt6a6bTn4fWy1dM/er2iMc7aBW+vREK3W485C/n4z4F0Hqo9xqhP7i6arNatWQYup5Xr/JA9EGSxhJ8P2HcuOi+TgnGNEo4W+FwtnehQ+lzj0YZATWhW2SIwq9gkL6tlmNUE36PesGzCDwYTiYXQajdDqueAkBHGIJK1SmYhVvdPFryk3a5nrAThO8Q2W+yLIyZrT2dFV6XwAiTAdoVl7O/6e8kfaGOSkEfvWFh03lhOLkRMwAadrlbXtHGyiBAfYwR7A+zGmjNjSWj6fVP1wmAZdkY8LGjAV8z4wa+h3/FCRkH0ymZDD299Q3vUHzZCH9FfuMHtFu5rHIWOREgdCsREf5QoLbFkG+YzexHRsmPLGxFD77vNoIEpcAIqaDbMU5ADduuL72LKGqXdZMTBKX+xnnss76ne8+sWQqrHmPDbjX2TVe6tAuKr36v0yvZ7mG3x7du2auJ+31uNchP+/SLq34KT1E5msnlvIkjKs4IZYPRtAcS1Bt0APP4XoyHxHP3OzbVlQvGTsMiXFGq+jXTHXiJS70DVRiEOm0xfTBuSVzXbEkY/KqUSvq8DSfF2BqXE7MhgXF4qB7cgkGkZ6DkOGT3R2wNOiWUy7yoccRiTttiWsTfXAb9Gb3H/8kV/fwng+ncss24K9hvWVjSGUxurm+uJ5MbvUITGMzEeedGx3Q8fn45LCgPQCoqWhNb/zjHshqO6bXN+6V9OTZ1tUPvcLc7zYsh8iwIl3vuOW53h2lu4Dt8ju1pu9e3A/+xu0/nI7CFh5l/Sesob24mYbul32162uIp9kbH6iat89ruttsd775VDh27NLpFyQRWE0+xE4bfq5MJvEcJpSLv77OtBIG0O3OWh4xmYGcP2dhYIpDQlGGKtNyrifEiZXX/tD2sZmH1HG7Qcy4nNE6Yq8ict0JYrrP7LMue9C426CnP1vxyNnN7N+9z0ebqegco6lykTIgja4JztqMY+P1uLieEuqxDAy0pBny/WYlLhEIuLff4yaMIEvMgCYVc6J37h/1yQNFy8ww+uV2TCUDTEC5IUjzRcb8xajH45RC22xoQyjFG7Za9IDgzzrRQkY7ls9meFwTsZFuXoIkY7DJ+nxs+Qzcwr51G7IoAUR6GFO88Zcd5ZWCJf0HT19FUwC3UbBsBwtPT/dboZ9QTl8NrNM6DYO+uE1haGIrZvue0Q3FWJROIDjJ+m5sVn6Wsq/IOssM9jzruDkIa8JCTzKc8vo7NwD7IaQ5i2dhQayfPJAhPu6kuGHvqmey1ZrRybCm/tzMF3p5rCAYwuolYQVC7iLOKbHif6soTfENEmDcPUyg3dVcgPGyXs3ybp5vNE31B1NgYosobXqulQpOBbodAuhMjxo3+LfxyeIGCNaLsqQyUFirUn/uZQGu3CK+BoTcovoln5anYPWcHt59jsF1xDAB0kUOC8f6Rdp9qKp1N+WhBXmTjhoZ9TaSglkZr9USkHXIQunrQvwaEUs3SxX+MJ4ARbY5Ksrurg8DrVsSUQIVByVjmMoEEwn7aGXa7FGLB//owfhTEk5lzUlpUQD9Ra+QvTOEiQDCL1BIbCGBIZkkJYA3AuZUWfCBVRG3I3dPpD0FoER3w3ILAoJqz4tpBXnuvsLw7LN0S/azXY6PMBt3ttur7fVUsa3KDkBkgaHO9CxCSirZT9QmK6VhNyB30EKLYya0TjJ4GwgPJhD5Md49lOii+5kQtCcKj8QCRH4IlJ6C1RgkCBWirltdXNBZQFZyQnZCzQ6cQIVV2MJay6CBAZaQ8OK4Pvm/lkFCB0LKkGfoKhAMl0KbbCgaaMo4CAQIftpxTAsnkuJfuxdTHYQnrEH0G2SngUnVVQ+ybXDDSgXa82Rgr2QkPBELTvJPIiCc4dncbis7Mppjo6XmHkp0poce7mocwFUm2x+2q1IyQr8P2hGYTs4ZJJvSSJOlJmbDiCZZDaixwBk0k5Esd+SyOFitA6Ay6SafbSZJOpzPo0OU8ChAqRYlukYbTqFSbBBIVTRjKgRMFgrloFHJjSTzaOUxXaz4kcMfpAGyRxVhRwk7XDjDihLB+OGoGpvh+zg2UlNFWpSMI4kDbsemMzg73/HIW5mMQxB+V8w7sjHYw7TalIlvVvf0+DTAVY3PHqy3POK8z5Hc3smqcTg7CfDzNt7kabLbstsonaRTaIdLimy0EQVjdS9MhlQRSaAewhdfimjCrX7saTNMOldghn3HC5+Yus+2DmJe5hEFkC2hEUYQg8N3X69yN3O0Oxx1yw+PulA7Llrmfr7q8vWpohBAxCQKemKxOvgmnVI4y1gQjVB2o86n5agzRAyUYm1WSaUkQ6B62Kt+sSwSTphwJgsqwit8rgmC9zmbDOI7KSrgAQfUtMUBYixQvbZT45sleOuRh8SMvMipzbG2EOFeReblnTmJ+Tw5xfdTKCGg+mWpVUfLaGQdhbdt26ZihKCn5aK4OAjJBnvEhENZauYO6hAKE5LwXWYnJRp61lFXeQ5GVrrbSUOxg3M8hHTJ760tOCcY1F9/c79MxMMfMFMCFDoKOZroXGqUM6aOaI9r7j/EEqzgAPdp8qGle3edzj+SVIH8KfqDhcLaOeM0kB2F/OBIbi6T7lt/P+vg6LZ3F4U0Mb0RdU9vNKThSIBAJbbc7/Me33a4MQiktq0DwypmZCJ1rz9dSzToNN4nvOQgWTuFNZI6rggLS3eNuTUUHXCyUOjd51GxbgvCaLostzY4cvdUGzeaSb3OhgaBdG1MTCXfrlb4psXRYqtGl+kP1Iy2oAtxULQLEkR+YxZz6IGI+d9U+xjwMNBAeDtlovJL1F6txgbaRFF6K3Q+GFzmaSSV5IAWhdzr0VTtLDkKUtxhEi1FMiXydjYxtcZTathSZsESWKu6V51oqL+RHEoSWHKJnBF96OQirfTpCW+Uk6oxonLDsGq+LGAJBEM007IesE6MFhv/QXMpEidZpal58dKGDUNxQU4FgoEnG0pEokY9Is2WYFQjVNHeDUo5Qk5XmrjSBEFZa3+ogPCIdQL9HT5qqjPBRNLph5XBxAQJXYbxzWxQ1B2KQ1isNuTMDMRolXBSCHMmYQMAT7aesHydJnKDhHP8aMA0ES8FJSTAaxXfkD7q28BpPy3QlOzSZbcaJBGGHdNBx4uZQPiGaENczJ5UHaozbWoxOa3JU0baMvG5zLEdNpkGsPyXvQgfBMJv5UDwEQXNHPTkhjc+J65nuATMEY2QLovhNawtD1eaXC8Zq3bQQjGpa6IAz/WhFAxNf17sXFAul9TTNWMyyEyAEfLo7h7/njHk1G4IwMCSwq7NDfjAaJy1BIJKKPLWEi/IOCoSuxT1Qtc3VKBkvtvDc2vov3WwuW1S9AoSwJ97gAxPpfpA/ZIff/OoTBcJRsypdl49KQTaiIVI9MGZ8X1jYQVACP9DuUIo2FyD0aqvXZPPq6vRTT3vTXO3kaHmH8owQQQm7YmKlH6hJSMjfS1VelhvijECgurTjNB4gKyMvd9AJ7gO/JzG3JdTbWbkmCMIIRRZVIHBKCPPABIFAh1njcbosF2LFsmeVhmvWZMvPVbQe9chSyYHKQejLxHg/lSiIFvNO7s97ghIECIZMHy74pBQ+sqQsGCeadgClImONEromJfDqP2MIDhQVVrlg9P5TuU4OQqtaB+TyHuI6JfD5LmIODc3eQIUHrlZBo0DYoeddbNN5yucG0WC5sbSyCmNpYmMHDgIdSOQioxIIRFFdW2qzm1OCdexNbWMVVqaE0oKQ0xqvRTx1JnXxVD7Xo5iy7ajwmtAO4jMqU1TbSe6/PqU9cw2XbwOBKkdB4LbThQvn3ByEXlSNBlZK+DTB3TTrsUpOkrQTyuTD1EihtSR9lZBVs8FeX1+O6TBmJTvh1bqJmTkvo/KSRZaD4OUg+C4HQRFbouoimEkJZ4o0Emt22fWCfGIBKw0My0Fwy9a4q0kiogR5WtZNqKc7F44L6LU8iQ7Js+XJevtifM8LLeLSZTJKyUgunaMWU6Z2UCB0jXCoBEFvI1Swr392DVREPS0DM9SguCZXkVVoXS4Y+d3qEo05fO6EnEukrdOnsTBrCxng9no6pWOjeaoY0JOvD73S1+iSTOAomyqSCJOOtT4tSl5kHgSq7bOEqjrK9QjUhtcASjEPXtn2xrn7TQhGRyVBxi/I6qfjiZpGxtJbdXkrXykMTqXthVYwdSEf1iJEqb5M+GoQ6fGENzrKQXc2eP/MNzrt8U2TCVBfuKXxgkOL5gPL8p8i5G5zpZnIe8kpuDO6GKcQC+r9dDHQFd48tW7LGRWxGgtSHGEpXd/cFPFmTU0v5Te1RHZIl/OsLiex1Mw59ezgnK8K7CsQQBm6xZF9P+mzXr/f/93U0hk+tfzCN/vdXgwDLYKBIq3fTzpd3OIYfyS/6edvbit4XaFINC6OXNa+aF90Ltrti8Gg7enOQ7/b6fV+93t+yUXrU+1av9+E8yV8DSNqAnoZWlCtnnWVnWB+p6jmcUNKZDYapVASa/DjeZBPfpHiJnKBu6xo9wG4fJzAr07Sazd9W4rU5wXA1JAhbkGlDxD4tgQpPSlPW9gG9mhz9FNjCURC9rhPobymopiC0Qxs67PDhuOzuOU3tJKwJjrBQcynSdKibsdzAtYKmy1RlwnFkqP8Ne8/3eaLGlFstVr0BKFJzlzYDJsWezekCzLmHOTdMDgIS1XgXeWFoLxMmJlxxH1qGfSSd3euWyXgRHH8KyIQmjFj3RAcJ/KDJCYSYDHF9ZwgarXUsHf1tUYQiuP7QciSLn6/G0d8nXrMw8RNxkJJC67Lb9Hagh1KIMhwN4HQa0AQGnlKSUBn2pjPDruUmKxZF5WvyWoRh/1iRcFnkP/mBN6itpr4i3/ul77XikKRPATo4G5dqg9lnMMID9Fnzw0C+yLI2q2JWuVtXvEwoZYdxAOmRdYIQjbkhSJ17hYUnKrayvMZhukcmuhdp8t0uZxdoqUGo+VyBD38tRigRpxyrRIvUMjHvhQcKOTn+HZMYrcDI9InS65n3eYc9+vBkA7Rzl1HUeLsW+7JpYO5uZFHpNVAEGZFLENrR+i55yghgel+V6ohCayJS18tSxPuMDXYTnnn6rftarU/pUP0Q8YH/P0bxm8IK02oQLXjNtM3EWwn+e8yZ7w/ZJcoQFqIUvb2mj6+vaDKi4OQ9uvDcH0qmdfK4j27OUSAw+e3N1E3EIa2GuU6MYkPdLfdGYVlxkKBMGhEUdRGNYb/X9D/+EqCQFN1qcvV8nI0ztBFRBBeV4c5BONjOoCeAIHGtnBjEYnNcYGnqY4zPs9wtDotR0OKIY+9foulRw7CCn2MrhIjF/LEtOFFRCyMyiKPFBQSmefQpKoTDQEAOxc7YPEs+fYLfWMyTxNrAKKuYJvH6qenFLpkVS4ALrPdiEA4ZBneypimsQ/QEaf+iv30KOp0Ih/4SNhshh9HNMTsLeXNqZbkEYVtAcLl6nWUP5L680uO0OoP8IDj0+ltXCJqZg6NrVTu8AmcMMx2x5oS0WAwvBTbldr4PNghtCHhIPwaoLGVpWmGJE31GId0dlqNxhSUFyDEAQehy5oeXWiHCGeYnTjRLk8zGMQDOtAQBbqkhCwveAxpdRCNn1WbuJbhcFCIBWPK+vTt9FLH2V49T/lBM0zRZHRaFpEYUssc3K7L7QeppKLDZUJMFucK3ZrdcpggCPu0v3xbEghECW/LoBP8Jl5PSFaRicABmHM+6aWnKeuxfjw9ZRyEE28xQSBwtwwiuCy1Ybq5vuagAPPMq42UrZQOAmtT/2ZQ08s9khXeR1IPTWtJNDXOIat2QAW4OUkMRX86CQI+2svREnXTAEgYXKaH9DVVgnHY62eKRHlR4GGFCmG/GuHeSyor6VEtfYoyIMpBGLGBXE4y1J8/UsAAJYMLVtPFDVpJSjUanRpmqFsDRV9Fsj6u9+NSM0IFUxttHl80jDF5knWVduAygT9cpAQi7PF6T9NOKQaFagemL+sRtMSCPjZM99nqZUVZ3SFN0aFo5PQF9dogYARCj2Zpj3LGrwgDNLOjMIwqw7UdWiVBcnFWNhPq1lfqkoK6sa7WJaHAIF83QafD04YsQgOXNhLTIQRBt1CR6Xy+XCMlCBBilAUIAirDYXrKFsuXPFHs07iCbISPdPr2fBl0WovTMZ0vKVLEGLSJbdBOeDlRPncmnMpcLaBi8MJQW6oVVvJPzvTtiESX1Nl8rjQkNSUhnQ9k02a6R1Zu6MuCrSKkaG9N64YECGEfFqfD6XRaLYa/+sQOQ+hdpIgFpSpH6fHt7WU5pJOREGMoH+Y8AP3MHxmbrd7eTqtjOu4HoOyE1ekNhXxqTiiAqiNVNu0onHF6NsoETVvRty855P4ezy68jp12nduVj7fwQJ8RBsMxkjmqWIopjy7R2mX0VjOII/zFfDKg/fGUVgQ7LjWAdiPojcZD5LskGuF3G4jq5Xg6HqGqHDKW4GdRO0joePixG/m522Nb/W1cZMSH0iM3LEuRBqbbxxDanUgeFRutKVzYUTvXDZhrmkTB2+RFkfIdSATRW8Ev7jRQ/Nnt/OKftKDB1yUG/BOqV2kLpo8H4rsIVBL94l+KcrETyQL9QAt0eGFQrd1TCnL2duRjiWqtS7UOmFV1JFqNKboPl3STFsxjKstMkm7S7fQoXtKlP+Je3On2+72Yarj7qDz6/W4n7uLrPr7T6Q36nfiim/RQq/T7SU9UY8Z8gSC92+vQwsEB/7uPigcAv47v/Y4TitbQ4XqdTpcHaPi56VWHv+jqKV39asNeyrkhtFiLrIjmQLXeCt0BoR/Iko0rM4OC0vq//4ktqBhDLXQE0fx/OxX1e7YRSNUFwzqIPiqufTYUSlWLLPk+CsvxfPm/tM2nHRrUWLZneHD2hK5XJ9LM49Isg1oHqsmdqNmRNHfiKpdE6Z3mYP56VEt5eMeUg7Ydj0e5xmefv8P/oEjxYS+LMPlf+C7/JfbJf4rgtP4e7Z+fxjib2OF4SEeVRdI0lYwIQcZKwapS/LNrwH0yZl93K/JbdMeChoLNj+vV6v6eiqZW2XrLFzOt6a8se7jf0ouHh83Dw5YKn/Gj1WOWZat1tn7IVrv1arOhOthX3Pt+gy8e8MV6l2VPG3r18JRlVKa32eARX/FbW3yNh3p83D4+bDYrWQSIX3vYyvZFqwxPSaVPZh2/77OEJMJpnOsGEGk3LQgJrlnMyQwN6ilSWAZdcw1yC22w9eN2mu6n6THbzrPs8eFps1q9vq5e03S3WS3T02r3kG1fV+vdCm822+zS5eJlNc/283S12mfZ5uEwS0+z5T7bb7JNdpzjgZYbvJfXebZN0+Nqu0GA1q8vi/RltcVD4XEesh0iRWUIs8Pjarfa4NuIyS57SeerzeP9UVqFmjNJqoEIodNUocFqNMwo0qgsUKcQzTBFL39aSuzw6rXtbjrPxulytpyn88UiW6YztOcWeP/pfLqkt2fLdD7DHdLZbHlYLpBxp7PlIl3gG8vt43E6y8ZivxntskjVq3nKv4uvj8jqaHbSS3xLvtqt5rNsibstMzrjPMNPpjN0O45mAx3wXeajxXziwZhKW+L8ln1LC75SfGn8un5djcyFlbTeAZ8EXxRNy5TpVvgdz8lQPvFLXM7n2Wz2Qp/NF+nsuFxMp6tZNkcspsv58rh7neP+iyndHN7ebIUAilcv+A2625c5UtpuMaP10elsfuKHwrMcEcvFnHZdLggwcYb5cbVHv82cdpdQygptUdHA3L6Wqdoop5KRS6jCDG1e1vJKucjdCs+MD4j/m72MCYNlhvd3oOeIby9WC7pK/AOvnCgB/0OXAd9AYlgiF9HX8W7mGb5NX8b9FnQUvLkl7rhAdqNv4x0uxa0itGm6PBIS+PyJOPAlHRD3X3IQWDlYjMzwPGTnZk9H0ZkYnRx6xThD6FWdNPOKijQes90R5Rjy+Bq5cva64q9QkCHL7+jtF+TVGQlEfBv5d31crR5Q5qG3mK6WKAjWBypyRdFJYjPNkOtfxKsNHYW+u92k2T7DXR7WeK+rFN9+QRmw3ZPEfMCdSS7v6AwrLiuKlQmtwG12STNQSEl1ra7TAuDXfAJFrPGF5+C7ujM5epFFxnjLtPRnl2Yva9U1brXH+6E/XjMUk9t8NQC+R7KcmmqhoF9Rtf8jr/XgKxjWK32v1RbBeF2tdtvVdi8qgrPH7VZWzq7kufZUyvbIfzyuXs1pxhTc/iuYIajJkCjTG6o5WX2Ksud55P6v16cZJKzBuzB4nstguqLeYHJDxU1/SO2e/z7SLrnSNw2A3ALQ39df8PQ2P9ZBHuqglbnoFS9HYW8cjvPfyo8GXiQ0ekYMls1usxno/YbrFn3UNJiDokKJiquasesVtDBbLHjrhsVCLcKhN/ibC77Ntffl38X72t/GO/k+8p86SfVL+XflEWZjvQM50QFhoNkOttZUTuC6xrAbTXcw0EgmSmBBKCzwyK4yJjvwv7cVllIUDQQGzyNes1aQNljakEKtrNDrXmNE4fXltBzy6kGfz6gPe7Tcl/w98iCpX0xXuJM9/pN7mJ1OQm/8TvDzhL/kH+Fr9B/Jz+x1xJLhhH8x6XCPtCOOh291Ouhc0g4JP4LYr8fPkyS/eZ8aPDoekZ+yUxh0rANjiUEXHIv2L7SgG8gO3kFNXEU0EUArmVFV0AtV1kjj0eXKNVTlB74ezmhQQ6VIvsdDR2LJRtQUqxCDyBNEFrmOHtkVRc/c5Y2I3Bqq72qTujNRXs03Y8EqHy3s3mY+9MjrUeE9YTAuW0mWR+6e7ZoEGiO18aiH9fFl3oek47mGES2imxapE8lUkCtqxv0wMK3vSMPbrSZZnUp8w15p4uvJRCrYo9Tn20nywrlQqqgSgvpOGiZWSF/T1emFEwPCkBcWFvdSn7b29DsqSopKrZK4pGl4AdgD55WCS1v6iFt3NArpmUcjhxTHtU0yATP85IK5II6V/Yu8ags1TvqGLMG7zIa9WFI+KwIYQVCZb24+VLM+rlWiCZdzmePgQWXQzFcM556tCdBb03VDanb7hqzwNo8pBPCj7QwZeOVytsH8hYjhhTfbjXoJazo/+qZ5H5E+a8fPP3QFCMJ68Uu4eRIWt8Qe2oma6DVTw3gOAdrKU6Q1z1J0YC0x0Ps4wpllxD7ajtRHFWF4O8lO3C4TbcToR5LE7STmSqGNekFoh4QlCfv1Cz+KO4zhDrTHL75bmz6hP5I2Y/SX/Gon6eCfnaTY1GeMdeKO2CXhX1Qf0/ljJoaPIQQoDd4WQ1nMB98978it68dXEKmGkdtMoDnlMJze0C0Yj/6n4ozD8Sx9eSNh8EaCq2dm26AciC5iDl5Nh8+gHJknDURVRCF1bkd79uXIKzGpn67axv/3tukUPc3nExEBQTCl1uZePYOaAeXA+1ljQY0cumiYjZcrsutfCPS30//l7Y0ugm/8cp6pVzzT1715Pyiy+qaXZqWII+y61Mh/+Xyk02qF+/+3wcDLeeZz2ljXLqaZVTygO+TWVnCVoy1aHDLpyd7Dy/SZShB+tB2NXy8CN7HswQph6a0jpzz7hod7Rs4U/d27SWCNJBo1i5X+0wBlWQDnCvWatHwEtQIXRq3haCRShGIbjbU//r/eao+L1zAUMrqXWBYwemUQLLkWKN18xcmq8pDwUagv5/+MbnDQoUtkNVPZ3PtW8OkQsBJc5Skg+sEikfHtBExYBIwlyjpAFc6ELSDMBvxJ5gL+izvCeoj5j1+GFSANi4S15eF+dfiO7XbyS+zJz3QhjIy4OHgn6eHuzAnOm0I145EqINTQTJ6F+OFWVA05Yr6QMPTcwDOqq30VAgq8cvdpV8v5Rdq7vn7RntYSu16c1XQKqTGjmPUY7HvruliJH4CdCT3tmVRurtJvutg9Mo8GthJ199zF5fwNNZYwwDf1veVScbughTwSF1Uv0dN/aUEr+LkbU2/2OpY8e/XrkTKJgvp0tAt2QRoFBR3brGnzGTr6Gw1OtZJYm6qWXNuxqcpIvbrqwXNYMP3+/eC/b25tGM3Taxt9LyoTbTP35Dx+W24N+K5afwEGZK74TqiO4Cv0BVaUE23KDufVS62qap/fvSvO4hpujryXYlGLFgFy+frwqIKHZXhDGeNIYeNWiT2qUokScrwWyRRgtXKUw0vgu5b4WZn+XJsxHNU+dq/w0Gv3/38Av38GhFFHjvgAAAAASUVORK5CYII=";

const C = {
  green: "#0f5c37", greenDeep: "#0a4327", greenSoft: "#e7f0ea",
  gold: "#bd922a", goldDeep: "#9a7620", goldSoft: "#f4ead0",
  bg: "#f4f6f2", surface: "#ffffff", ink: "#17241d", muted: "#68766c",
  border: "#e3e8df", danger: "#b23b3b", dangerSoft: "#f7e7e6",
  blue: "#2f7fa8", blueSoft: "#e6f0f5",
};

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
* { box-sizing: border-box; }
.kbih-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: ${C.ink}; }
.kbih-root ::selection { background: ${C.goldSoft}; }
.serif { font-family: 'Fraunces', Georgia, serif; }
.btn { border: none; cursor: pointer; font-family: inherit; font-weight: 600; transition: all .15s ease; display: inline-flex; align-items: center; gap: 8px; }
.btn:active { transform: translateY(1px); }
.card-hover { transition: box-shadow .18s ease, transform .18s ease, border-color .18s ease; }
.card-hover:hover { box-shadow: 0 8px 24px rgba(15,92,55,.10); transform: translateY(-2px); border-color: ${C.green}33; }
input, select, textarea { font-family: inherit; font-size: 14px; color: ${C.ink}; }
.field:focus { outline: none; border-color: ${C.green} !important; box-shadow: 0 0 0 3px ${C.green}22; }
.iconbtn { transition: background .15s ease, color .15s ease; }
.iconbtn:hover { background: ${C.greenSoft}; }
.navtab { transition: all .15s ease; }
.seat { transition: transform .12s ease, box-shadow .12s ease; user-select: none; }
.seat:hover { transform: scale(1.04); }
.seat.dragover { box-shadow: 0 0 0 3px ${C.gold}; }
.kbih-scroll::-webkit-scrollbar { height: 9px; width: 9px; }
.kbih-scroll::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 20px; }
.fade { animation: fade .35s ease; }
@keyframes fade { from { opacity:0; transform: translateY(6px);} to {opacity:1; transform:none;} }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Tulisan Arab */
.arab {
  font-family: 'Arabic Typesetting', 'Amiri', 'Scheherazade New', 'Traditional Arabic', serif;
  line-height: 1.9;
}

/* Tata letak dasar */
.grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.wrap { max-width: 1160px; margin: 0 auto; padding: 26px 22px 60px; }
.hdr-wrap { max-width: 1160px; margin: 0 auto; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; position: relative; }
.bus-layout { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 20px; align-items: start; }
.kartu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }

/* --- Penyesuaian layar HP --- */
@media (max-width: 720px) {
  .grid2 { grid-template-columns: 1fr; }
  .wrap { padding: 18px 13px 48px; }
  .hdr-wrap { padding: 14px 13px; gap: 12px; }
  .bus-layout { grid-template-columns: 1fr; }
  .kartu-grid { grid-template-columns: 1fr; }
  .jam-blok { gap: 14px !important; }
  .jam-angka { font-size: 20px !important; }
  .jam-item { min-width: 116px !important; }
  .judul-hal { font-size: 20px !important; }
  .kop-nama { font-size: 18px !important; }
  .kop-tagline { font-size: 11px !important; }
  .kop-logo { width: 44px !important; height: 44px !important; }
  .navtab { padding: 12px 12px !important; font-size: 13.5px; }
  .kartu-pad { padding: 16px !important; }
  .sembunyi-hp { display: none !important; }
}
@media (max-width: 400px) {
  .jam-blok { gap: 10px !important; }
  .jam-angka { font-size: 18px !important; }
  .jam-item { min-width: 100px !important; }
}
@media (prefers-reduced-motion: reduce) { *, .fade { animation: none !important; } }
`;

const HUB = ["Suami", "Istri", "Anak", "Ayah", "Ibu", "Saudara", "Pendamping", "Kerabat"];

/* ---------- konfigurasi Telegram ----------
   Token TIDAK disimpan di dalam kode. Diisi sekali lewat
   halaman Laporan, lalu tersimpan di Firestore dan hanya
   bisa dibaca pembimbing yang sudah login.
------------------------------------------- */
const TG_KOSONG = { token: "", chatId: "", pencatat: "" };

/* ---------- helper unggah berkas ---------- */
// Gambar dikecilkan dulu di HP agar hemat kuota, lalu disimpan di Firestore.
const bacaBerkas = (file) => kecilkanGambar(file);
const formatUkuran = (b) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`);
const bukaBerkas = (berkas) => { if (berkas?.data) window.open(berkas.data, "_blank", "noopener"); };

/* ---------- helpers ---------- */
function hitungUsia(tgl) {
  if (!tgl) return null;
  const b = new Date(tgl + "T00:00:00"); if (isNaN(b)) return null;
  const n = new Date(); let y = n.getFullYear() - b.getFullYear();
  const m = n.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < b.getDate())) y--;
  return y;
}
function labelUsia(y) {
  if (y == null) return null;
  if (y >= 60) return { text: `${y} tahun`, tag: "Lansia" };
  if (y < 17) return { text: `${y} tahun`, tag: "Muda" };
  return { text: `${y} tahun`, tag: null };
}
const inisial = (n) => (n || "?").trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join("").toUpperCase();
const idTime = (tz, now) => new Intl.DateTimeFormat("id-ID", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
const idDate = (tz, now) => new Intl.DateTimeFormat("id-ID", { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(now);
const tglPanjang = (tgl) => { if (!tgl) return "—"; const d = new Date(tgl + "T00:00:00"); return isNaN(d) ? "—" : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(d); };
const tglRingkas = (tgl) => { if (!tgl) return "—"; const d = new Date(tgl + "T00:00:00"); return isNaN(d) ? "—" : new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short" }).format(d); };
const waLink = (tel) => { const d = (tel || "").replace(/\D/g, ""); if (!d) return null; const n = d.startsWith("0") ? "62" + d.slice(1) : d.startsWith("62") ? d : "62" + d; return `https://wa.me/${n}`; };
const telLink = (tel) => { const d = (tel || "").replace(/[^\d+]/g, ""); return d ? `tel:${d}` : null; };

/* ---------- geo: jarak & arah ---------- */
const toRad = (d) => (d * Math.PI) / 180;
function jarakMeter(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function bearingDerajat(lat1, lon1, lat2, lon2) {
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));
  return (((Math.atan2(y, x) * 180) / Math.PI) + 360) % 360;
}
/* ---------- tautan Google Maps ---------- */
const mapsCari = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const mapsRute = (lat, lng, moda = "walking") =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${moda}`;

/* ---------- kondisi harian jamaah ---------- */
const KONDISI = {
  sehat:    { label: "Sehat",           warna: "#0f5c37", latar: "#e7f0ea", ikon: Smile },
  kurang:   { label: "Kurang sehat",    warna: "#9a7620", latar: "#f4ead0", ikon: Thermometer },
  sakit:    { label: "Sakit",           warna: "#b23b3b", latar: "#f7e7e6", ikon: HeartPulse },
  perhatian:{ label: "Butuh perhatian", warna: "#2f7fa8", latar: "#e6f0f5", ikon: Activity },
};

const MATA_ANGIN = ["Utara", "Timur Laut", "Timur", "Tenggara", "Selatan", "Barat Daya", "Barat", "Barat Laut"];
const arahMataAngin = (deg) => MATA_ANGIN[Math.round(deg / 45) % 8];
const formatJarak = (m) => (m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`);

/* ---------- seed ---------- */
const SEED_TITIK_PENTING = [
  { id: 1, nama: "Masjidil Haram", catatan: "Titik referensi utama Makkah.", lat: 21.4225, lng: 39.8262, gambar: null },
  { id: 2, nama: "Masjid Nabawi", catatan: "Titik referensi utama Madinah.", lat: 24.4672, lng: 39.6112, gambar: null },
];
const SEED_TITIK_KUMPUL = [
  { id: 1, nama: "Pintu King Abdul Aziz (Gate 1)", catatan: "Titik kumpul setelah thawaf.", lat: 21.4218, lng: 39.8256, gambar: null },
];
const SEED_DOA = [
  { id: 1, kategori: "Ihram", judul: "Niat Umroh", arab: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً", latin: "Labbaika Allahumma 'umratan", arti: "Aku penuhi panggilan-Mu ya Allah untuk berumroh.", catatan: "Dibaca saat memulai ihram di miqat.", berkas: null },
  { id: 2, kategori: "Talbiyah", judul: "Bacaan Talbiyah", arab: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ", latin: "Labbaika Allahumma labbaik, labbaika laa syariika laka labbaik", arti: "Aku penuhi panggilan-Mu ya Allah, tiada sekutu bagi-Mu.", catatan: "Diperbanyak sejak ihram hingga mulai thawaf.", berkas: null },
  { id: 3, kategori: "Thawaf", judul: "Doa Antara Rukun Yamani dan Hajar Aswad", arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", latin: "Rabbanaa aatinaa fid-dunyaa hasanah wa fil-aakhirati hasanah wa qinaa 'adzaaban-naar", arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.", catatan: "", berkas: null },
];
const SEED_PERIODE = [
  { id: 1, nama: "Umroh Reguler Agustus", jenis: "Umroh", tahun: "2026", berangkat: "2026-08-12", pulang: "2026-08-21", catatan: "Rombongan A & B, 2 pembimbing.", dibuat: "2026-07-18T00:00:00.000Z" },
];
const SEED_KAT_DOA = ["Ihram", "Talbiyah", "Thawaf", "Sa'i", "Ziarah", "Harian"];
const SEED_KAT_FIQH = ["Rukun & Wajib", "Larangan Ihram", "Dam & Denda", "Thawaf", "Sa'i", "Wanita"];
const SEED_FIQH = [
  { id: 1, kategori: "Rukun & Wajib", judul: "Rukun Umroh", isi: "Rukun umroh ada empat: (1) ihram disertai niat, (2) thawaf, (3) sa'i, (4) tahallul (mencukur atau memotong rambut). Bila salah satu rukun ditinggalkan, umroh tidak sah dan tidak dapat diganti dengan dam.", dalil: "Disepakati mayoritas ulama; sebagian menambahkan tertib sebagai rukun.", rujukan: "Fikih Manasik — mazhab Syafi'i", catatan: "Tekankan pada jamaah saat manasik: rukun tidak bisa diganti denda.", berkas: null },
  { id: 2, kategori: "Larangan Ihram", judul: "Larangan Selama Ihram", isi: "Antara lain: memakai pakaian berjahit bagi laki-laki, menutup kepala bagi laki-laki, menutup wajah dan telapak tangan bagi perempuan, memakai wewangian, memotong kuku dan rambut, berburu binatang darat, memotong tanaman tanah haram, melangsungkan akad nikah, dan berhubungan suami istri.", dalil: "QS. Al-Baqarah: 197 dan hadis-hadis terkait.", rujukan: "Fikih Manasik", catatan: "Ingatkan sebelum miqat, terutama soal wewangian di sabun dan tisu basah.", berkas: null },
  { id: 3, kategori: "Dam & Denda", judul: "Dam karena Meninggalkan Wajib", isi: "Meninggalkan kewajiban umroh (misalnya ihram tidak dari miqat) tidak membatalkan umroh, tetapi mewajibkan dam berupa menyembelih seekor kambing. Bila tidak mampu, diganti puasa sepuluh hari: tiga hari di tanah suci dan tujuh hari setelah kembali.", dalil: "QS. Al-Baqarah: 196.", rujukan: "Fikih Manasik", catatan: "Bedakan dengan rukun yang tidak bisa diganti dam.", berkas: null },
];
const SEED_LAPORAN = [
  { id: 1, jenis: "Kegiatan", judul: "Manasik hari pertama selesai", isi: "Manasik berjalan lancar, dihadiri 3 jamaah. Materi thawaf & sa'i tersampaikan. Jamaah Aminah perlu perhatian ekstra karena kursi roda.", pencatat: "Ustadz Fulan", waktuISO: "2026-08-05T10:15:00.000Z", status: "lokal" },
];
const SEED = [
  { id: 1, foto: null, nama: "Hj. Aminah Suryani", jenisKelamin: "Perempuan", noPaspor: "C4839201", telepon: "0812-3456-7890", alamat: "Bogor, Jawa Barat", rombongan: "A", tempatLahir: "Cianjur", tanggalLahir: "1955-04-12", riwayatPenyakit: "Hipertensi, konsumsi Amlodipine rutin pagi hari.", pendamping: "", kursiRoda: true, catatan: "Perlu bantuan naik-turun bus. Kamar dekat lift.", relasi: [{ id: 2, hubungan: "Suami" }, { id: 3, hubungan: "Anak" }] },
  { id: 2, foto: null, nama: "H. Abdul Karim", jenisKelamin: "Laki-laki", noPaspor: "C5120388", telepon: "0813-9988-1122", alamat: "Depok, Jawa Barat", rombongan: "A", tempatLahir: "Bandung", tanggalLahir: "1968-09-30", riwayatPenyakit: "Diabetes tipe 2. Bawa insulin, simpan di kotak dingin.", pendamping: "", kursiRoda: false, catatan: "Jamaah pertama kali umroh.", relasi: [{ id: 1, hubungan: "Istri" }, { id: 3, hubungan: "Anak" }] },
  { id: 3, foto: null, nama: "Siti Rohmah", jenisKelamin: "Perempuan", noPaspor: "C6001547", telepon: "0857-2211-3344", alamat: "Sukabumi, Jawa Barat", rombongan: "B", tempatLahir: "Sukabumi", tanggalLahir: "1990-01-25", riwayatPenyakit: "Tidak ada.", pendamping: "", kursiRoda: false, catatan: "", relasi: [{ id: 1, hubungan: "Ibu" }, { id: 2, hubungan: "Ayah" }] },
];
const SEED_AGENDA = [
  { id: 1, tanggal: "2026-08-05", waktu: "08:00", judul: "Manasik Umroh", lokasi: "Aula KBIH Ibnu Aqil, Bogor", keterangan: "Pembekalan tata cara umroh & pembagian kelompok." },
  { id: 2, tanggal: "2026-08-12", waktu: "14:00", judul: "Berkumpul & Keberangkatan", lokasi: "Bandara Soekarno-Hatta, Terminal 3", keterangan: "Kumpul 4 jam sebelum boarding.", lat: -6.1256, lng: 106.6558 },
  { id: 3, tanggal: "2026-08-13", waktu: "10:00", judul: "Ziarah Kota Madinah", lokasi: "Masjid Nabawi & sekitarnya", keterangan: "Ziarah Raudhah, Masjid Quba, Jabal Uhud." },
  { id: 4, tanggal: "2026-08-16", waktu: "23:00", judul: "Pelaksanaan Umroh", lokasi: "Masjidil Haram, Makkah", keterangan: "Miqat, thawaf, sa'i, tahallul." },
];
const SEED_SEATS = { "5A": 1, "5B": 2 };
const SEED_ABSEN = { 1: { 1: "hadir", 2: "hadir", 3: "izin" } };

const STAT = {
  hadir: { label: "Hadir", color: C.green, bg: C.greenSoft, icon: CheckCircle2, huruf: "H" },
  izin: { label: "Izin", color: C.goldDeep, bg: C.goldSoft, icon: MinusCircle, huruf: "I" },
  tidak: { label: "Tidak", color: C.danger, bg: C.dangerSoft, icon: XCircle, huruf: "T" },
};

/* ---------- shared UI ---------- */
function DualClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const Item = ({ label, tz, accent }) => (
    <div className="jam-item" style={{ minWidth: 146 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: accent }} />
        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".05em", color: "#d7e4da", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div className="jam-angka" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{idTime(tz, now)}</div>
      <div style={{ fontSize: 10.5, color: "#b9cdc0", marginTop: 3 }}>{idDate(tz, now)}</div>
    </div>
  );
  return (
    <div className="jam-blok" style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Moon size={16} color={C.gold} className="sembunyi-hp" />
        <Item label="Makkah · AST" tz="Asia/Riyadh" accent={C.gold} />
      </div>
      <div style={{ width: 1, height: 44, background: "#ffffff22" }} />
      <Item label="WIB · Jakarta" tz="Asia/Jakarta" accent="#7fd0a3" />
    </div>
  );
}
function Avatar({ foto, nama, size = 48 }) {
  if (foto) return <img src={foto} alt={nama} style={{ width: size, height: size, borderRadius: 14, objectFit: "cover", objectPosition: "center top", border: `2px solid ${C.border}` }} />;
  return <div style={{ width: size, height: size, borderRadius: 14, background: C.greenSoft, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.34, border: `2px solid ${C.green}22` }}>{inisial(nama)}</div>;
}
function Badge({ children, bg, color, icon: Icon }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg, color, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>{Icon && <Icon size={12} />} {children}</span>;
}
function ContactBtns({ tel, size = 34, stop }) {
  const wa = waLink(tel), t = telLink(tel);
  const s = { width: size, height: size, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" };
  const click = (e) => stop && e.stopPropagation();
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <a href={wa || undefined} onClick={click} target="_blank" rel="noreferrer" title="Chat WhatsApp" style={{ ...s, background: wa ? "#e4f4ea" : C.bg, color: wa ? "#1f9d55" : C.border, pointerEvents: wa ? "auto" : "none" }}><MessageCircle size={17} /></a>
      <a href={t || undefined} onClick={click} title="Telepon" style={{ ...s, background: t ? C.greenSoft : C.bg, color: t ? C.green : C.border, pointerEvents: t ? "auto" : "none" }}><Phone size={16} /></a>
    </div>
  );
}
function Section({ title }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "22px 0 14px" }}><span style={{ width: 4, height: 16, background: C.gold, borderRadius: 4 }} /><span style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", color: C.ink }}>{title}</span></div>;
}
const inputStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 11, background: "#fff" };

/* Didefinisikan di tingkat modul — kalau ditaruh di dalam komponen,
   React membuat ulang kotak isian tiap ketikan dan keyboard tertutup. */
const Label = ({ children, req }) => (
  <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>
    {children}{req && <span style={{ color: C.danger }}> *</span>}
  </label>
);
const Grid = ({ children }) => <div className="grid2">{children}</div>;
function Modal({ children, onClose, width = 460 }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#0a271799", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }}>
      <div className="fade" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width, maxWidth: "100%", maxHeight: "86vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.3)" }}>{children}</div>
    </div>
  );
}

/* ---------- editor gambar: atur ukuran & posisi ---------- */
const RASIO = {
  potret:  { label: "Potret 3:4",  w: 3, h: 4 },
  persegi: { label: "Persegi 1:1", w: 1, h: 1 },
  lanskap: { label: "Lanskap 4:3", w: 4, h: 3 },
};
const LEBAR_PRATINJAU = 262;

function EditorGambar({ sumber, rasioAwal = "potret", judul = "Atur Foto", onBatal, onSelesai }) {
  const [rasio, setRasio] = useState(rasioAwal);
  const [zoom, setZoom] = useState(1);
  const [geser, setGeser] = useState({ x: 0, y: 0 });
  const [gbr, setGbr] = useState(null);
  const [sibuk, setSibuk] = useState(false);
  const seret = useRef(null);

  useEffect(() => {
    const i = new Image();
    i.onload = () => setGbr(i);
    i.src = sumber;
  }, [sumber]);

  const R = RASIO[rasio];
  const TINGGI_PRATINJAU = Math.round((LEBAR_PRATINJAU * R.h) / R.w);

  useEffect(() => { setGeser({ x: 0, y: 0 }); setZoom(1); }, [rasio]);

  if (!gbr) {
    return (
      <Modal onClose={onBatal} width={360}>
        <div style={{ padding: 40, textAlign: "center", color: C.muted, fontSize: 13 }}>
          <Loader2 size={22} className="spin" color={C.green} />
          <div style={{ marginTop: 10 }}>Memuat gambar…</div>
        </div>
      </Modal>
    );
  }

  const skalaDasar = Math.max(LEBAR_PRATINJAU / gbr.width, TINGGI_PRATINJAU / gbr.height);
  const skala = skalaDasar * zoom;
  const lebarTampil = gbr.width * skala;
  const tinggiTampil = gbr.height * skala;
  const batasX = Math.max(0, (lebarTampil - LEBAR_PRATINJAU) / 2);
  const batasY = Math.max(0, (tinggiTampil - TINGGI_PRATINJAU) / 2);
  const jepit = (n, b) => Math.max(-b, Math.min(b, n));
  const gx = jepit(geser.x, batasX);
  const gy = jepit(geser.y, batasY);

  const mulaiSeret = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    seret.current = { px: e.clientX, py: e.clientY, ax: gx, ay: gy };
  };
  const jalanSeret = (e) => {
    if (!seret.current) return;
    const d = seret.current;
    setGeser({ x: jepit(d.ax + (e.clientX - d.px), batasX), y: jepit(d.ay + (e.clientY - d.py), batasY) });
  };
  const akhirSeret = () => { seret.current = null; };

  const simpan = async () => {
    setSibuk(true);
    try {
      // Ukuran hasil akhir — sisi terpanjang 1000 px
      const panjang = 1000;
      const keluarW = R.w >= R.h ? panjang : Math.round((panjang * R.w) / R.h);
      const keluarH = R.h >= R.w ? panjang : Math.round((panjang * R.h) / R.w);

      const sw = LEBAR_PRATINJAU / skala;
      const sh = TINGGI_PRATINJAU / skala;
      const cx = gbr.width / 2 - gx / skala;
      const cy = gbr.height / 2 - gy / skala;
      let sx = Math.max(0, Math.min(gbr.width - sw, cx - sw / 2));
      let sy = Math.max(0, Math.min(gbr.height - sh, cy - sh / 2));

      const kanvas = document.createElement("canvas");
      kanvas.width = keluarW; kanvas.height = keluarH;
      const ctx = kanvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, keluarW, keluarH);
      ctx.drawImage(gbr, sx, sy, sw, sh, 0, 0, keluarW, keluarH);

      let mutu = 0.75;
      let hasil = kanvas.toDataURL("image/jpeg", mutu);
      while (hasil.length > 300 * 1024 && mutu > 0.35) {
        mutu -= 0.1;
        hasil = kanvas.toDataURL("image/jpeg", mutu);
      }
      onSelesai({
        nama: "foto.jpg",
        tipe: "image/jpeg",
        ukuran: Math.round((hasil.length * 3) / 4),
        data: hasil,
      });
    } catch (e) {
      alert("Gagal memproses gambar. Coba foto lain.");
    }
    setSibuk(false);
  };

  return (
    <Modal onClose={onBatal} width={360}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700 }}>{judul}</h3>
          <button className="btn iconbtn" onClick={onBatal} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>

        {/* pilihan bentuk */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, justifyContent: "center" }}>
          {Object.entries(RASIO).map(([k, v]) => {
            const on = rasio === k;
            return (
              <button key={k} className="btn" onClick={() => setRasio(k)}
                style={{ flex: 1, justifyContent: "center", background: on ? C.green : "#fff", color: on ? "#fff" : C.muted, border: `1px solid ${on ? C.green : C.border}`, padding: "7px 6px", borderRadius: 10, fontSize: 11.5 }}>
                {v.label}
              </button>
            );
          })}
        </div>

        {/* area pratinjau */}
        <div
          onPointerDown={mulaiSeret} onPointerMove={jalanSeret}
          onPointerUp={akhirSeret} onPointerCancel={akhirSeret} onPointerLeave={akhirSeret}
          style={{
            width: LEBAR_PRATINJAU, height: TINGGI_PRATINJAU, margin: "0 auto",
            overflow: "hidden", position: "relative", borderRadius: 14,
            background: "#111", cursor: "grab", touchAction: "none",
            border: `2px solid ${C.border}`,
          }}>
          <img src={sumber} alt="" draggable={false}
            style={{
              position: "absolute", left: "50%", top: "50%",
              width: lebarTampil, height: tinggiTampil, maxWidth: "none",
              transform: `translate(calc(-50% + ${gx}px), calc(-50% + ${gy}px))`,
              userSelect: "none", pointerEvents: "none",
            }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 11.5, color: C.muted, marginTop: 8 }}>
          Seret gambar untuk menggeser posisi
        </div>

        {/* pembesaran */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <ImagePlus size={16} color={C.muted} />
          <input type="range" min="1" max="3" step="0.02" value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: C.green }} />
          <span style={{ fontSize: 12, color: C.muted, minWidth: 34, textAlign: "right" }}>{zoom.toFixed(1)}×</span>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
          <button className="btn" onClick={onBatal} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" onClick={simpan} disabled={sibuk} style={{ background: C.green, color: "#fff", padding: "10px 20px", borderRadius: 11 }}>
            {sibuk ? <Loader2 size={16} className="spin" /> : <Check size={16} />} {sibuk ? "Memproses…" : "Gunakan"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------- unggah gambar ---------- */
function UploadGambar({ nilai, onChange, tinggi = 130, label = "Unggah gambar", rasio = "potret" }) {
  const ref = useRef(null);
  const [sibuk, setSibuk] = useState(false);
  const [mentah, setMentah] = useState(null);
  const pilih = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Pilih berkas gambar (JPG/PNG).");
    if (file.size > 12 * 1024 * 1024) return alert("Ukuran gambar maksimal 12 MB.");
    setSibuk(true);
    const rd = new FileReader();
    rd.onload = () => { setMentah(rd.result); setSibuk(false); };
    rd.onerror = () => { alert("Gagal membaca gambar."); setSibuk(false); };
    rd.readAsDataURL(file);
    e.target.value = "";
  };
  return (
    <div>
      {mentah && (
        <EditorGambar sumber={mentah} rasioAwal={rasio} judul="Atur Gambar"
          onBatal={() => setMentah(null)}
          onSelesai={(hasil) => { onChange(hasil); setMentah(null); }} />
      )}
      <input ref={ref} type="file" accept="image/*" onChange={pilih} style={{ display: "none" }} />
      {nilai ? (
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
          <img src={nilai.data} alt={nilai.nama} style={{ width: "100%", height: tinggi, objectFit: "cover", display: "block" }} />
          <button className="btn" onClick={() => onChange(null)} title="Hapus gambar" style={{ position: "absolute", top: 8, right: 8, background: "#0a2717cc", color: "#fff", width: 28, height: 28, borderRadius: 99, padding: 0, justifyContent: "center" }}><X size={15} /></button>
          <button className="btn" onClick={() => ref.current?.click()} style={{ position: "absolute", bottom: 8, right: 8, background: "#ffffffee", color: C.green, padding: "6px 11px", borderRadius: 9, fontSize: 12 }}><Camera size={14} /> Ganti</button>
        </div>
      ) : (
        <button className="btn" onClick={() => ref.current?.click()} disabled={sibuk} style={{ width: "100%", justifyContent: "center", flexDirection: "column", gap: 6, padding: "20px 14px", borderRadius: 12, border: `1.5px dashed ${C.border}`, background: C.bg, color: C.muted }}>
          {sibuk ? <Loader2 size={22} color={C.green} className="spin" /> : <ImagePlus size={22} color={C.green} />}
          <span style={{ fontSize: 13 }}>{sibuk ? "Mengunggah…" : label}</span>
          <span style={{ fontSize: 11, fontWeight: 500 }}>Bisa diatur ukuran & posisinya</span>
        </button>
      )}
    </div>
  );
}

/* ---------- tautan berkas (PDF/dokumen) ----------
   Berkas besar tidak diunggah ke server, cukup ditautkan
   dari Google Drive agar tetap gratis dan ringan.
-------------------------------------------------- */
function TautanBerkas({ nilai, onChange, label = "Tautan berkas (PDF)", petunjuk }) {
  const [buka, setBuka] = useState(false);
  const [url, setUrl] = useState("");
  const [nama, setNama] = useState("");

  const simpan = () => {
    const rapi = rapikanTautan(url);
    if (!rapi) return alert("Tempelkan tautan berkasnya dulu.");
    onChange({ nama: nama.trim() || "Berkas materi", tipe: "tautan", data: rapi });
    setBuka(false); setUrl(""); setNama("");
  };

  if (nilai) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", border: `1px solid ${C.border}`, borderRadius: 12, background: "#fff" }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: C.dangerSoft, color: C.danger, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><FileText size={18} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nilai.nama}</div>
          <div style={{ fontSize: 11.5, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nilai.data}</div>
        </div>
        <button className="btn iconbtn" onClick={() => bukaBerkas(nilai)} title="Buka" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Download size={15} /></button>
        <button className="btn iconbtn" onClick={() => onChange(null)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><X size={15} /></button>
      </div>
    );
  }

  if (!buka) {
    return (
      <button className="btn" onClick={() => setBuka(true)} style={{ width: "100%", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 12, border: `1.5px dashed ${C.border}`, background: C.bg, color: C.muted }}>
        <LinkIcon size={18} color={C.green} /> <span style={{ fontSize: 13 }}>{label}</span>
      </button>
    );
  }

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 13, background: "#fff" }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 9, lineHeight: 1.5 }}>
        {petunjuk || "Unggah berkas ke Google Drive, klik kanan → Bagikan → ubah ke \u201cSiapa saja yang memiliki link\u201d, lalu tempelkan tautannya di sini."}
      </div>
      <input className="field" style={{ ...inputStyle, marginBottom: 8 }} value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama berkas (cth. Materi Manasik Hari 1)" />
      <input className="field" autoFocus style={{ ...inputStyle, marginBottom: 10 }} value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && simpan()} placeholder="Tempel tautan di sini…" />
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="btn" onClick={() => { setBuka(false); setUrl(""); setNama(""); }} style={{ background: C.bg, color: C.muted, padding: "8px 14px", borderRadius: 10, fontSize: 12.5 }}>Batal</button>
        <button className="btn" onClick={simpan} style={{ background: C.green, color: "#fff", padding: "8px 16px", borderRadius: 10, fontSize: 12.5 }}><Check size={15} /> Simpan tautan</button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* ---------- gerbang: cek login dulu ---------- */
export default function App() {
  const pengguna = usePengguna();

  if (pengguna === undefined) return <LayarMuat pesan="Memeriksa sesi…" />;
  if (!pengguna) return <LoginGate logo={LOGO} />;
  return <AppInti pengguna={pengguna} />;
}

function LayarMuat({ pesan }) {
  return (
    <div className="kbih-root" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <style>{STYLE}</style>
      <img src={LOGO} alt="KBIH Ibnu Aqil" style={{ width: 72, height: 72, borderRadius: 18, border: `1px solid ${C.border}` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 9, color: C.muted, fontSize: 13.5 }}>
        <Loader2 size={17} className="spin" color={C.green} /> {pesan}
      </div>
    </div>
  );
}

function AppInti({ pengguna }) {
  const [periode, setPeriode, siapPeriode] = useKoleksiTersinkron("periode", SEED_PERIODE);
  const [idAktif, setIdAktif] = useState(() => {
    try { return localStorage.getItem("kbih-periode") || null; } catch { return null; }
  });

  // Pastikan periode aktif selalu ada
  useEffect(() => {
    if (!siapPeriode || !periode.length) return;
    const ada = periode.some((p) => String(p.id) === String(idAktif));
    if (!ada) pilihPeriode(periode[0].id);
  }, [siapPeriode, periode, idAktif]);

  const pilihPeriode = (id) => {
    setIdAktif(String(id));
    try { localStorage.setItem("kbih-periode", String(id)); } catch { /* abaikan */ }
  };

  const akunSaya = useAkunSaya(pengguna.uid);
  const peranSaya = akunSaya === undefined ? "memuat" : (akunSaya?.peran || "Pembimbing");
  const bolehKelola = peranSaya !== "Jamaah";

  // Akun jamaah terkunci pada periode tempat datanya berada
  const pid = bolehKelola
    ? String(idAktif || (periode[0] && periode[0].id) || "kosong")
    : String(akunSaya?.periodeId || idAktif || (periode[0] && periode[0].id) || "kosong");
  const periodeAktif = periode.find((p) => String(p.id) === pid) || null;

  // --- Data per periode ---
  const [list, setList, siapList] = useKoleksiTersinkron(bolehKelola ? ["periode", pid, "jamaah"] : null, SEED);
  // Daftar ringkas (nama, foto, telepon) — boleh dibaca akun jamaah
  const [direktori] = useKoleksiTersinkron(pid !== "kosong" ? ["periode", pid, "direktori"] : null, []);
  // Data pribadi milik akun jamaah yang sedang login
  const [sayaJamaah, simpanSayaJamaah, siapSaya] = useDokumenMentah(
    !bolehKelola && akunSaya?.jamaahId ? ["periode", pid, "jamaah", String(akunSaya.jamaahId)] : null
  );
  const [agenda, setAgenda] = useKoleksiTersinkron(["periode", pid, "agenda"], SEED_AGENDA);
  const [seats, setSeats] = useDataTersinkron(bolehKelola ? ["periode", pid, "data", "kursi"] : null, SEED_SEATS);
  const [absen, setAbsen] = useDataTersinkron(bolehKelola ? ["periode", pid, "data", "absensi"] : null, SEED_ABSEN);
  const [titikPenting, setTitikPenting] = useKoleksiTersinkron(bolehKelola ? ["periode", pid, "titikPenting"] : null, SEED_TITIK_PENTING);
  const [titikKumpul, setTitikKumpul] = useKoleksiTersinkron(bolehKelola ? ["periode", pid, "titikKumpul"] : null, SEED_TITIK_KUMPUL);
  const [laporan, setLaporan] = useKoleksiTersinkron(bolehKelola ? ["periode", pid, "laporan"] : null, SEED_LAPORAN);

  // --- Data bersama semua periode ---
  const [doa, setDoa] = useKoleksiTersinkron("doa", SEED_DOA);
  const [fiqh, setFiqh] = useKoleksiTersinkron("fiqh", SEED_FIQH);
  const [katDoa, setKatDoa] = useDataTersinkron("kategoriDoa", SEED_KAT_DOA);
  const [katFiqh, setKatFiqh] = useDataTersinkron("kategoriFiqh", SEED_KAT_FIQH);
  const [tg, setTg] = useDataTersinkron("telegram", TG_KOSONG);

  const [page, setPage] = useState("periode");
  const pasang = usePemasangan();

  // Pembimbing menyalin daftar ringkas agar bisa dibaca akun jamaah
  useEffect(() => {
    if (!bolehKelola || !siapList || pid === "kosong") return;
    const t = setTimeout(() => sinkronDirektori(pid, list), 800);
    return () => clearTimeout(t);
  }, [bolehKelola, siapList, pid, list]);
  const lokasi = useLokasiGlobal();
  const [darurat, setDarurat] = useDataTersinkron("darurat", { kontak: [] });

  const byId = (id) => list.find((j) => j.id === Number(id));

  const navLengkap = [
    { id: "periode", label: "Periode", icon: LayoutGrid },
    { id: "jamaah", label: "Jamaah", icon: Users },
    { id: "kontak", label: "Kontak", icon: Phone },
    { id: "bus", label: "Kursi Bis", icon: Bus },
    { id: "agenda", label: "Agenda", icon: CalendarDays },
    { id: "absensi", label: "Absensi", icon: ClipboardCheck },
    { id: "lokasi", label: "Lokasi", icon: Navigation },
    { id: "doa", label: "Doa", icon: BookOpen },
    { id: "fiqh", label: "Fiqh", icon: Scale },
    { id: "laporan", label: "Laporan", icon: FileText },
    { id: "akun", label: "Pengaturan", icon: Settings },
    { id: "darurat", label: "Darurat", icon: AlertOctagon, merah: true },
  ];
  const NAV_JAMAAH_KHUSUS = [
    { id: "kartuku", label: "Kartu Saya", icon: ContactRound },
    { id: "kontak", label: "Jamaah", icon: Users },
    { id: "agenda", label: "Agenda", icon: CalendarDays },
    { id: "doa", label: "Doa", icon: BookOpen },
    { id: "fiqh", label: "Fiqh", icon: Scale },
    { id: "darurat", label: "Darurat", icon: AlertOctagon, merah: true },
  ];
  const nav = bolehKelola ? navLengkap : NAV_JAMAAH_KHUSUS;

  // Jika halaman aktif tidak boleh dibuka peran ini, alihkan
  useEffect(() => {
    if (peranSaya === "memuat") return;
    if (!nav.some((n) => n.id === page)) setPage(bolehKelola ? "periode" : "kartuku");
  }, [peranSaya, page]);
  // Halaman yang butuh periode aktif
  const perluPeriode = bolehKelola ? ["jamaah", "kontak", "bus", "agenda", "absensi", "lokasi", "laporan"] : [];

  return (
    <div className="kbih-root" style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{STYLE}</style>

      <header style={{ background: `linear-gradient(115deg, ${C.greenDeep} 0%, ${C.green} 62%, #12693e 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .14, backgroundImage: "radial-gradient(circle at 12% 20%, #ffffff33 0 2px, transparent 2px), radial-gradient(circle at 80% 60%, #ffffff22 0 2px, transparent 2px)", backgroundSize: "44px 44px" }} />
        <div className="hdr-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 6, boxShadow: "0 6px 18px rgba(0,0,0,.18)" }}>
              <img src={LOGO} alt="KBIH Ibnu Aqil" className="kop-logo" style={{ width: 56, height: 56, display: "block", borderRadius: 10 }} />
            </div>
            <div>
              <div className="serif kop-nama" style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>KBIH Ibnu Aqil</div>
              <div className="kop-tagline" style={{ color: C.goldSoft, fontSize: 12.5, fontWeight: 500 }}>Melayani dengan Ikhlas, Membimbing dengan Amanah</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <DualClock />
            <div style={{ display: "flex", alignItems: "center", gap: 9, paddingLeft: 16, borderLeft: "1px solid #ffffff22" }}>
              {lokasi.aktif && (
                <span title="Lokasi sedang aktif" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#ffffff22", color: "#7fd0a3", padding: "6px 10px", borderRadius: 99, fontSize: 11.5, fontWeight: 700 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "#7fd0a3" }} />
                  <span className="sembunyi-hp">Lokasi aktif</span>
                </span>
              )}
              {pasang.bisa && (
                <button className="btn" onClick={pasang.pasang} title="Pasang aplikasi di HP"
                  style={{ background: C.gold, color: "#3a2c05", padding: "8px 13px", borderRadius: 11, fontSize: 12.5 }}>
                  <DownloadIcon size={15} /> <span className="sembunyi-hp">Pasang Aplikasi</span>
                </button>
              )}
              <div style={{ textAlign: "right", lineHeight: 1.3 }}>
                <div className="sembunyi-hp" style={{ fontSize: 11, color: "#b9cdc0" }}>Masuk sebagai</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pengguna.email}</div>
              </div>
              <button className="btn" onClick={() => { if (window.confirm("Keluar dari aplikasi?")) keluar(); }} title="Keluar"
                style={{ background: "#ffffff1a", color: "#fff", padding: 10, borderRadius: 11 }}><LogOut size={16} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* NAV */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 16px", display: "flex", gap: 4, overflowX: "auto" }} className="kbih-scroll">
          {nav.map((n) => {
            const on = page === n.id;
            return (
              <button key={n.id} className="btn navtab" onClick={() => setPage(n.id)}
                style={{ position: "relative", background: "transparent",
                  color: n.merah ? C.danger : (on ? C.green : C.muted),
                  padding: "14px 16px",
                  borderBottom: `3px solid ${on ? (n.merah ? C.danger : C.green) : "transparent"}`,
                  borderRadius: 0, fontWeight: on || n.merah ? 800 : 600, whiteSpace: "nowrap" }}>
                <n.icon size={17} /> {n.label}
                {n.alert && <span style={{ position: "absolute", top: 9, right: 6, width: 8, height: 8, borderRadius: 99, background: C.danger }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pita periode aktif */}
      {periodeAktif && page !== "periode" && (
        <div style={{ background: C.greenSoft, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "9px 14px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Badge bg={periodeAktif.jenis === "Haji" ? C.goldSoft : "#fff"} color={periodeAktif.jenis === "Haji" ? C.goldDeep : C.green}>
              {periodeAktif.jenis}
            </Badge>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{periodeAktif.nama}</span>
            <span className="sembunyi-hp" style={{ fontSize: 12, color: C.muted }}>
              {periodeAktif.berangkat ? tglRingkas(periodeAktif.berangkat) : "—"}
            </span>
            <button className="btn" onClick={() => setPage("periode")}
              style={{ marginLeft: "auto", background: "#fff", color: C.green, border: `1px solid ${C.green}33`, padding: "6px 12px", borderRadius: 9, fontSize: 12 }}>
              <ArrowRightLeft size={14} /> Ganti
            </button>
          </div>
        </div>
      )}

      <main className="wrap">
        {page === "darurat" ? (
          <DaruratPage lokasi={lokasi} tg={tg} darurat={darurat || { kontak: [] }} setDarurat={setDarurat}
            pengguna={pengguna} periodeAktif={periodeAktif} setLaporan={setLaporan} />
        ) : page !== "periode" && perluPeriode.includes(page) && !periodeAktif ? (
          <TanpaPeriode onBuka={() => setPage("periode")} />
        ) : (
        <>
        {page === "periode" && (
          <PeriodePage periode={periode} setPeriode={setPeriode} idAktif={pid} bolehKelola={bolehKelola}
            onPilih={(id) => { pilihPeriode(id); setPage(bolehKelola ? "jamaah" : "agenda"); }} siap={siapPeriode} />
        )}
        {page === "akun" && <PengaturanPage pengguna={pengguna} akunSaya={akunSaya} list={list} pid={pid} periodeAktif={periodeAktif} />}
        {page === "kartuku" && (
          <KartuSayaPage saya={sayaJamaah} simpan={simpanSayaJamaah} siap={siapSaya}
            akunSaya={akunSaya} pengguna={pengguna} tg={tg} pid={pid} periodeAktif={periodeAktif} />
        )}
        {page === "jamaah" && <JamaahPage list={list} setList={setList} pengguna={pengguna} />}
        {page === "kontak" && <KontakPage list={bolehKelola ? list : direktori} bolehKelola={bolehKelola} />}
        {page === "bus" && <BusPage list={list} seats={seats} setSeats={setSeats} byId={byId} />}
        {page === "agenda" && <AgendaPage agenda={agenda} setAgenda={setAgenda} list={list} absen={absen} setAbsen={setAbsen} bolehKelola={bolehKelola} />}
        {page === "absensi" && <AbsensiPage agenda={agenda} list={list} absen={absen} setAbsen={setAbsen} />}
        {page === "lokasi" && <LokasiPage titikPenting={titikPenting} setTitikPenting={setTitikPenting} titikKumpul={titikKumpul} setTitikKumpul={setTitikKumpul} lokasi={lokasi} />}
        {page === "doa" && <DoaPage doa={doa} setDoa={setDoa} kategori={katDoa || []} setKategori={setKatDoa} bolehKelola={bolehKelola} />}
        {page === "fiqh" && <FiqhPage fiqh={fiqh} setFiqh={setFiqh} kategori={katFiqh || []} setKategori={setKatFiqh} bolehKelola={bolehKelola} />}
        {page === "laporan" && <LaporanPage laporan={laporan} setLaporan={setLaporan} tg={{ ...tg, pencatat: tg?.pencatat || pengguna.email?.split("@")[0] || "" }} setTg={setTg} agenda={agenda} list={list} absen={absen} periodeAktif={periodeAktif} />}
        </>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "0 20px 34px", color: C.muted, fontSize: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {siapList ? <><CheckCircle2 size={13} color={C.green} /> Data tersimpan & tersinkron ke server</> : <><Loader2 size={13} className="spin" /> Menghubungkan ke server…</>}
        </span>
        <div style={{ marginTop: 4 }}>KBIH Ibnu Aqil · Aplikasi Manajemen Jamaah</div>
      </footer>
    </div>
  );
}

/* ============================================================
   JAMAAH PAGE
   ============================================================ */
function JamaahPage({ list, setList, pengguna }) {
  const [view, setView] = useState("list");
  const [selId, setSelId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const selected = list.find((j) => j.id === selId);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? list.filter((j) => [j.nama, j.rombongan, j.noPaspor, j.tempatLahir].join(" ").toLowerCase().includes(s)) : list;
  }, [list, q]);
  const stats = useMemo(() => ({
    total: list.length,
    lansia: list.filter((j) => (hitungUsia(j.tanggalLahir) ?? 0) >= 60).length,
    kursiRoda: list.filter((j) => j.kursiRoda).length,
  }), [list]);

  const remove = (id) => { if (window.confirm("Hapus data jamaah ini?")) { setList((l) => l.filter((j) => j.id !== id)); setView("list"); } };
  const save = (data) => {
    const clean = { ...data, relasi: (data.relasi || []).filter((r) => r.id).map((r) => ({ id: Number(r.id), hubungan: r.hubungan })) };
    if (clean.id) setList((l) => l.map((j) => (j.id === clean.id ? clean : j)));
    else { clean.id = Date.now(); setList((l) => [...l, clean]); }
    setSelId(clean.id); setView("detail");
  };

  const perbarui = (id, ubah) => setList((l) => l.map((j) => (j.id === id ? { ...j, ...ubah } : j)));

  if (view === "detail" && selected)
    return <JamaahDetail j={selected} list={list} pengguna={pengguna}
      onBack={() => setView("list")} onEdit={() => { setEditing(selected); setView("form"); }}
      onDelete={() => remove(selected.id)} onOpen={(id) => { setSelId(id); }}
      onPerbarui={(ubah) => perbarui(selected.id, ubah)} />;
  if (view === "form")
    return <JamaahForm initial={editing} list={list} onCancel={() => setView(editing ? "detail" : "list")} onSave={save} />;

  const StatCard = ({ label, value, icon: Icon, accent }) => (
    <div style={{ flex: 1, minWidth: 150, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: accent + "1a", color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} /></div>
      <div><div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{value}</div><div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{label}</div></div>
    </div>
  );

  return (
    <div className="fade">
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard label="Total jamaah" value={stats.total} icon={Users} accent={C.green} />
        <StatCard label="Lansia (60+)" value={stats.lansia} icon={Calendar} accent={C.gold} />
        <StatCard label="Pengguna kursi roda" value={stats.kursiRoda} icon={Accessibility} accent={C.blue} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Daftar Jamaah</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Kelola profil dan kebutuhan tiap jamaah bimbingan.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} color={C.muted} style={{ position: "absolute", left: 12, top: 12 }} />
            <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama / rombongan…" style={{ padding: "10px 12px 10px 36px", border: `1px solid ${C.border}`, borderRadius: 12, width: 230, background: "#fff" }} />
          </div>
          <button className="btn" onClick={() => { setEditing(null); setView("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Tambah Jamaah</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <Users size={32} color={C.border} /><p style={{ margin: "12px 0 0", fontWeight: 600 }}>Belum ada jamaah yang cocok.</p>
        </div>
      ) : (
        <div className="kartu-grid">
          {filtered.map((j) => {
            const u = labelUsia(hitungUsia(j.tanggalLahir));
            const relCount = (j.relasi || []).filter((r) => list.some((x) => x.id === Number(r.id))).length;
            return (
              <div key={j.id} className="card-hover" onClick={() => { setSelId(j.id); setView("detail"); }} role="button"
                style={{ cursor: "pointer", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar foto={j.foto} nama={j.nama} size={52} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.nama}</div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{j.jenisKelamin} · {u ? u.text : "usia —"}</div>
                  </div>
                  <span style={{ background: C.greenSoft, color: C.green, fontWeight: 800, fontSize: 12, padding: "4px 9px", borderRadius: 9 }}>Rmb {j.rombongan || "-"}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {u?.tag && <Badge bg={C.goldSoft} color={C.goldDeep}>{u.tag}</Badge>}
                  {j.kursiRoda && <Badge bg={C.blueSoft} color={C.blue} icon={Accessibility}>Kursi roda</Badge>}
                  {j.riwayatPenyakit && !/^tidak ada/i.test(j.riwayatPenyakit.trim()) && <Badge bg={C.dangerSoft} color={C.danger} icon={Stethoscope}>Ada riwayat</Badge>}
                  {relCount > 0 && <Badge bg={C.greenSoft} color={C.green} icon={Link2}>Keluarga ({relCount})</Badge>}
                </div>
                {(() => {
                  const t = catatanTerakhir(j);
                  if (!t || !KONDISI[t.kondisi]) return null;
                  const k = KONDISI[t.kondisi];
                  const jml = (j.catatanHarian || []).length;
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: k.latar, borderRadius: 11, padding: "8px 11px", borderLeft: `3px solid ${k.warna}` }}>
                      <k.ikon size={15} color={k.warna} style={{ flexShrink: 0 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: k.warna, lineHeight: 1.3 }}>{k.label}</div>
                        <div style={{ fontSize: 10.5, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {t.tanggal ? tglRingkas(t.tanggal) : "—"} · {jml} catatan
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 11 }}>
                  <span style={{ fontSize: 12.5, color: C.muted, display: "inline-flex", alignItems: "center", gap: 5 }}><Phone size={13} /> {j.telepon || "—"}</span>
                  <ContactBtns tel={j.telepon} stop />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const jamWIB = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
const jamAST = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Riyadh", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));

const catatanTerakhir = (j) => {
  const c = j?.catatanHarian || [];
  if (!c.length) return null;
  return [...c].sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""))[0];
};

function RelasiChips({ j, list, onOpen, dark }) {
  const rels = (j.relasi || []).map((r) => ({ ...r, ref: list.find((x) => x.id === Number(r.id)) })).filter((r) => r.ref);
  if (!rels.length) return null;
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {rels.map((r, i) => (
        <button key={i} className="btn" onClick={() => onOpen && onOpen(r.ref.id)}
          style={{ background: dark ? "#ffffff22" : C.greenSoft, color: dark ? "#fff" : C.green, padding: "5px 11px", borderRadius: 99, fontSize: 12.5 }}>
          <HeartHandshake size={13} /> {r.hubungan}: {r.ref.nama}
        </button>
      ))}
    </div>
  );
}

function JamaahDetail({ j, list, onBack, onEdit, onDelete, onOpen, onPerbarui, pengguna }) {
  const [tulisCatatan, setTulisCatatan] = useState(false);
  const [ubahCatatan, setUbahCatatan] = useState(null);
  const y = hitungUsia(j.tanggalLahir); const u = labelUsia(y);
  const Row = ({ icon: Icon, label, children, accent = C.green }) => (
    <div style={{ display: "flex", gap: 12, padding: "13px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 10, background: accent + "14", color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: C.muted }}>{label}</div>
        <div style={{ fontSize: 14.5, marginTop: 3, lineHeight: 1.45 }}>{children}</div>
      </div>
    </div>
  );
  return (
    <div className="fade">
      <button className="btn" onClick={onBack} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Kembali ke daftar</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <div style={{ background: "#fff", padding: 4, borderRadius: 18 }}><Avatar foto={j.foto} nama={j.nama} size={78} /></div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="serif" style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>{j.nama}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <Badge bg="#ffffff26" color="#fff">Rombongan {j.rombongan || "-"}</Badge>
              {u && <Badge bg="#ffffff26" color="#fff">{u.text}{u.tag ? ` · ${u.tag}` : ""}</Badge>}
              {j.kursiRoda && <Badge bg="#ffffff26" color="#fff" icon={Accessibility}>Kursi roda</Badge>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ContactBtns tel={j.telepon} size={38} />
            <button className="btn" onClick={onEdit} style={{ background: C.gold, color: "#3a2c05", padding: "9px 16px", borderRadius: 11 }}><Pencil size={16} /> Ubah</button>
            <button className="btn iconbtn" onClick={onDelete} title="Hapus" style={{ background: "#ffffff1a", color: "#fff", padding: 10, borderRadius: 11 }}><Trash2 size={16} /></button>
          </div>
        </div>
        <div style={{ padding: "8px 24px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0 40px" }}>
          <div>
            <Row icon={User} label="Jenis kelamin">{j.jenisKelamin || "—"}</Row>
            <Row icon={CreditCard} label="No. paspor">{j.noPaspor || "—"}</Row>
            <Row icon={Calendar} label="Tempat, tanggal lahir">
              {j.tempatLahir || "—"}, {tglPanjang(j.tanggalLahir)}
              {y != null && <span style={{ display: "inline-block", marginLeft: 8, background: C.goldSoft, color: C.goldDeep, fontWeight: 700, fontSize: 12, padding: "2px 8px", borderRadius: 8 }}>Usia {y} tahun{y >= 60 ? " · Lansia" : ""}</span>}
            </Row>
            <Row icon={Phone} label="Telepon">{j.telepon || "—"}</Row>
            <Row icon={MapPin} label="Alamat">{j.alamat || "—"}</Row>
          </div>
          <div>
            <Row icon={Stethoscope} label="Riwayat penyakit" accent={C.danger}>{j.riwayatPenyakit || "Tidak ada catatan."}</Row>
            <Row icon={Link2} label="Keluarga & relasi">
              {(j.relasi || []).some((r) => list.some((x) => x.id === Number(r.id))) ? <RelasiChips j={j} list={list} onOpen={onOpen} /> : "Tidak ada relasi tercatat."}
              {j.pendamping ? <div style={{ marginTop: 6, fontSize: 13, color: C.muted }}>Catatan pendamping: {j.pendamping}</div> : null}
            </Row>
            <Row icon={Accessibility} label="Kursi roda" accent={C.blue}>{j.kursiRoda ? "Ya — membutuhkan kursi roda" : "Tidak"}</Row>
            <Row icon={StickyNote} label="Catatan pembimbing" accent={C.gold}>{j.catatan || "—"}</Row>
          </div>
        </div>
      </div>

      {/* ---------- Catatan & kondisi harian ---------- */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <NotebookPen size={18} color={C.green} /> Catatan & Kondisi Harian
            </h3>
            <p style={{ margin: "3px 0 0", fontSize: 12.5, color: C.muted }}>Riwayat pemantauan jamaah dari hari ke hari.</p>
          </div>
          <button className="btn" onClick={() => { setUbahCatatan(null); setTulisCatatan(true); }}
            style={{ background: C.green, color: "#fff", padding: "9px 15px", borderRadius: 11, fontSize: 13 }}>
            <Plus size={16} /> Tambah Catatan
          </button>
        </div>

        <RiwayatCatatan j={j} onUbah={(c) => { setUbahCatatan(c); setTulisCatatan(true); }}
          onHapus={(id) => {
            if (!window.confirm("Hapus catatan ini?")) return;
            onPerbarui({ catatanHarian: (j.catatanHarian || []).filter((c) => c.id !== id) });
          }} />
      </div>

      {tulisCatatan && (
        <CatatanHarianModal
          awal={ubahCatatan}
          namaPencatat={pengguna?.email?.split("@")[0] || ""}
          onClose={() => { setTulisCatatan(false); setUbahCatatan(null); }}
          onSimpan={(c) => {
            const lama = j.catatanHarian || [];
            const baru = c.id ? lama.map((x) => (x.id === c.id ? c : x)) : [...lama, { ...c, id: Date.now() }];
            onPerbarui({ catatanHarian: baru });
            setTulisCatatan(false); setUbahCatatan(null);
          }} />
      )}
    </div>
  );
}

function RiwayatCatatan({ j, onUbah, onHapus }) {
  const daftar = [...(j.catatanHarian || [])].sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""));

  if (!daftar.length) {
    return (
      <div style={{ border: `1px dashed ${C.border}`, borderRadius: 14, padding: "30px 18px", textAlign: "center", color: C.muted }}>
        <NotebookPen size={26} color={C.border} />
        <p style={{ margin: "10px 0 0", fontSize: 13, fontWeight: 600 }}>Belum ada catatan harian.</p>
        <p style={{ margin: "3px 0 0", fontSize: 12.5 }}>Catat kondisi jamaah setiap hari agar mudah dipantau.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {daftar.map((c) => {
        const k = KONDISI[c.kondisi] || KONDISI.sehat;
        return (
          <div key={c.id} style={{ display: "flex", gap: 12, padding: "13px 14px", background: C.bg, borderRadius: 13, borderLeft: `4px solid ${k.warna}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: k.latar, color: k.warna, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <k.ikon size={17} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: k.warna }}>{k.label}</span>
                <span style={{ fontSize: 11.5, color: C.muted }}>{c.tanggal ? tglRingkas(c.tanggal) : "—"}</span>
                {c.waktuISO && (
                  <span style={{ display: "inline-flex", gap: 7, fontSize: 11, color: C.muted, alignItems: "center" }}>
                    <span style={{ background: C.bg, padding: "2px 7px", borderRadius: 6 }}>WIB {jamWIB(c.waktuISO)}</span>
                    <span style={{ background: C.goldSoft, color: C.goldDeep, padding: "2px 7px", borderRadius: 6, fontWeight: 700 }}>AST {jamAST(c.waktuISO)}</span>
                  </span>
                )}
              </div>
              {c.isi && <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{c.isi}</div>}
              {(c.suhu || c.tensi || c.obat) && (
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 7, fontSize: 12, color: C.muted }}>
                  {c.suhu && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Thermometer size={12} /> {c.suhu}</span>}
                  {c.tensi && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Activity size={12} /> {c.tensi}</span>}
                  {c.obat && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><HeartPulse size={12} /> {c.obat}</span>}
                </div>
              )}
              {c.pencatat && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 7, display: "flex", alignItems: "center", gap: 4 }}><User size={12} /> {c.pencatat}</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <button className="btn iconbtn" onClick={() => onUbah(c)} title="Ubah" style={{ background: "#fff", padding: 7, borderRadius: 8 }}><Pencil size={13} /></button>
              <button className="btn iconbtn" onClick={() => onHapus(c.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 7, borderRadius: 8 }}><Trash2 size={13} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CatatanHarianModal({ awal, namaPencatat, onClose, onSimpan }) {
  const sekarang = new Date();
  const hariIni = `${sekarang.getFullYear()}-${String(sekarang.getMonth() + 1).padStart(2, "0")}-${String(sekarang.getDate()).padStart(2, "0")}`;
  const jamIni = `${String(sekarang.getHours()).padStart(2, "0")}:${String(sekarang.getMinutes()).padStart(2, "0")}`;

  const [f, setF] = useState(awal || {
    tanggal: hariIni, waktu: jamIni, kondisi: "sehat", isi: "",
    suhu: "", tensi: "", obat: "", pencatat: namaPencatat,
    waktuISO: sekarang.toISOString(),
  });
  const [ubahWaktu, setUbahWaktu] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const bisa = f.isi.trim() || f.suhu || f.tensi || f.obat;

  // Waktu yang sedang dipilih, untuk ditampilkan dalam dua zona
  const isoPilihan = useMemo(() => {
    const d = new Date(`${f.tanggal}T${f.waktu || "00:00"}:00`);
    return isNaN(d) ? new Date().toISOString() : d.toISOString();
  }, [f.tanggal, f.waktu]);

  const simpan = () => onSimpan({ ...f, waktuISO: isoPilihan });

  return (
    <Modal onClose={onClose} width={440}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <NotebookPen size={18} color={C.green} /> {awal ? "Ubah Catatan" : "Catatan Harian"}
          </h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>

        <Label>Kondisi jamaah</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
          {Object.entries(KONDISI).map(([k, v]) => {
            const on = f.kondisi === k;
            return (
              <button key={k} className="btn" onClick={() => set("kondisi", k)}
                style={{ justifyContent: "flex-start", padding: "10px 12px", borderRadius: 11, fontSize: 12.5,
                  background: on ? v.latar : "#fff", color: on ? v.warna : C.muted,
                  border: `1.5px solid ${on ? v.warna : C.border}` }}>
                <v.ikon size={15} /> {v.label}
              </button>
            );
          })}
        </div>

        <Label>Waktu pencatatan</Label>
        <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 9, display: "flex", alignItems: "center", gap: 7 }}>
            <CalendarDays size={15} color={C.green} /> {tglPanjang(f.tanggal)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 11px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".05em", color: C.muted, textTransform: "uppercase", marginBottom: 3 }}>WIB · Jakarta</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.green, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{jamWIB(isoPilihan)}</div>
            </div>
            <div style={{ background: C.goldSoft, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "9px 11px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".05em", color: C.goldDeep, textTransform: "uppercase", marginBottom: 3 }}>AST · Makkah</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.goldDeep, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{jamAST(isoPilihan)}</div>
            </div>
          </div>

          {!ubahWaktu ? (
            <button className="btn" onClick={() => setUbahWaktu(true)}
              style={{ background: "transparent", color: C.muted, padding: "8px 0 0", fontSize: 12, fontWeight: 600 }}>
              <Pencil size={12} /> Ubah tanggal / waktu
            </button>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
              <input className="field" type="date" style={inputStyle} value={f.tanggal} onChange={(e) => set("tanggal", e.target.value)} />
              <input className="field" type="time" style={inputStyle} value={f.waktu} onChange={(e) => set("waktu", e.target.value)} />
            </div>
          )}
        </div>

        <div style={{ marginTop: 14 }}>
          <Label>Catatan</Label>
          <textarea className="field" rows={3} style={{ ...inputStyle, resize: "vertical" }} value={f.isi} onChange={(e) => set("isi", e.target.value)}
            placeholder="cth. Mengeluh pusing setelah thawaf, sudah istirahat dan minum air zamzam." />
        </div>

        <div style={{ marginTop: 14 }}>
          <Label>Pemeriksaan (opsional)</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input className="field" style={inputStyle} value={f.suhu} onChange={(e) => set("suhu", e.target.value)} placeholder="Suhu, cth. 37,5°C" />
            <input className="field" style={inputStyle} value={f.tensi} onChange={(e) => set("tensi", e.target.value)} placeholder="Tensi, cth. 140/90" />
          </div>
          <input className="field" style={{ ...inputStyle, marginTop: 8 }} value={f.obat} onChange={(e) => set("obat", e.target.value)} placeholder="Obat yang diberikan (opsional)" />
        </div>

        <div style={{ marginTop: 14 }}>
          <Label>Dicatat oleh</Label>
          <input className="field" style={inputStyle} value={f.pencatat} onChange={(e) => set("pencatat", e.target.value)} placeholder="Nama pembimbing" />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button className="btn" onClick={onClose} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" disabled={!bisa} onClick={simpan}
            style={{ background: bisa ? C.green : C.border, color: "#fff", padding: "10px 20px", borderRadius: 11, cursor: bisa ? "pointer" : "not-allowed" }}>
            <Check size={16} /> Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}

function JamaahForm({ initial, list, onCancel, onSave }) {
  const [f, setF] = useState(initial || { foto: null, nama: "", jenisKelamin: "Laki-laki", noPaspor: "", telepon: "", alamat: "", rombongan: "", tempatLahir: "", tanggalLahir: "", riwayatPenyakit: "", pendamping: "", kursiRoda: false, catatan: "", relasi: [] });
  const fileRef = useRef(null);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const setRel = (i, k, v) => setF((s) => { const r = [...(s.relasi || [])]; r[i] = { ...r[i], [k]: v }; return { ...s, relasi: r }; });
  const addRel = () => setF((s) => ({ ...s, relasi: [...(s.relasi || []), { id: "", hubungan: "Anak" }] }));
  const delRel = (i) => setF((s) => ({ ...s, relasi: (s.relasi || []).filter((_, x) => x !== i) }));
  const [fotoSibuk, setFotoSibuk] = useState(false);
  const [fotoMentah, setFotoMentah] = useState(null);
  const pickPhoto = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Pilih berkas gambar.");
    if (file.size > 12 * 1024 * 1024) return alert("Ukuran foto maksimal 12 MB.");
    setFotoSibuk(true);
    const rd = new FileReader();
    rd.onload = () => { setFotoMentah(rd.result); setFotoSibuk(false); };
    rd.onerror = () => { alert("Gagal membaca foto."); setFotoSibuk(false); };
    rd.readAsDataURL(file);
    e.target.value = "";
  };
  const y = hitungUsia(f.tanggalLahir);
  const canSave = f.nama.trim().length > 0;
  const others = list.filter((j) => j.id !== f.id);

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 820, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 4px", fontSize: 23, fontWeight: 600 }}>{initial ? "Ubah Data Jamaah" : "Tambah Jamaah Baru"}</h2>
        <p style={{ margin: "0 0 22px", fontSize: 13, color: C.muted }}>Lengkapi profil dan kebutuhan khusus jamaah.</p>

        {fotoMentah && (
          <EditorGambar sumber={fotoMentah} rasioAwal="potret" judul="Atur Foto Jamaah"
            onBatal={() => setFotoMentah(null)}
            onSelesai={(hasil) => { set("foto", hasil.data); setFotoMentah(null); }} />
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ position: "relative" }}>
            <Avatar foto={f.foto} nama={f.nama || "?"} size={84} />
            {f.foto && <button className="btn" onClick={() => set("foto", null)} title="Hapus foto" style={{ position: "absolute", top: -6, right: -6, background: C.danger, color: "#fff", width: 24, height: 24, borderRadius: 99, padding: 0, justifyContent: "center" }}><X size={14} /></button>}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} style={{ display: "none" }} />
            <button className="btn" onClick={() => fileRef.current?.click()} disabled={fotoSibuk} style={{ background: C.greenSoft, color: C.green, padding: "9px 15px", borderRadius: 11 }}>{fotoSibuk ? <Loader2 size={16} className="spin" /> : <Camera size={16} />} {fotoSibuk ? "Mengunggah…" : f.foto ? "Ganti foto" : "Unggah foto"}</button>
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Setelah dipilih, foto bisa digeser & diperbesar. Bentuk potret disarankan.</div>
          </div>
        </div>

        <Section title="Profil dasar" />
        <Grid>
          <div style={{ gridColumn: "1 / -1" }}><Label req>Nama lengkap</Label><input className="field" style={inputStyle} value={f.nama} onChange={(e) => set("nama", e.target.value)} placeholder="cth. Hj. Aminah Suryani" /></div>
          <div><Label>Jenis kelamin</Label><select className="field" style={inputStyle} value={f.jenisKelamin} onChange={(e) => set("jenisKelamin", e.target.value)}><option>Laki-laki</option><option>Perempuan</option></select></div>
          <div><Label>Rombongan</Label><input className="field" style={inputStyle} value={f.rombongan} onChange={(e) => set("rombongan", e.target.value)} placeholder="cth. A" /></div>
          <div><Label>No. paspor</Label><input className="field" style={inputStyle} value={f.noPaspor} onChange={(e) => set("noPaspor", e.target.value)} placeholder="cth. C4839201" /></div>
          <div><Label>Telepon / WhatsApp</Label><input className="field" style={inputStyle} value={f.telepon} onChange={(e) => set("telepon", e.target.value)} placeholder="08xx-xxxx-xxxx" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Alamat</Label><input className="field" style={inputStyle} value={f.alamat} onChange={(e) => set("alamat", e.target.value)} placeholder="Kota / domisili" /></div>
        </Grid>

        <Section title="Tempat & tanggal lahir" />
        <Grid>
          <div><Label>Tempat lahir</Label><input className="field" style={inputStyle} value={f.tempatLahir} onChange={(e) => set("tempatLahir", e.target.value)} placeholder="cth. Cianjur" /></div>
          <div><Label>Tanggal lahir</Label><input className="field" type="date" style={inputStyle} value={f.tanggalLahir} onChange={(e) => set("tanggalLahir", e.target.value)} max={new Date().toISOString().slice(0, 10)} /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ background: y != null ? C.goldSoft : C.bg, border: `1px solid ${y != null ? C.gold + "55" : C.border}`, borderRadius: 12, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <Calendar size={17} color={C.goldDeep} />
              <span style={{ fontSize: 13.5 }}>{y != null ? <><strong>Usia otomatis: {y} tahun.</strong> {y >= 60 ? "Termasuk lansia — perhatikan mobilitas & kesehatan." : y < 17 ? "Jamaah usia muda." : "Usia dewasa."}</> : <span style={{ color: C.muted }}>Isi tanggal lahir untuk menghitung usia otomatis.</span>}</span>
            </div>
          </div>
        </Grid>

        <Section title="Keluarga & relasi jamaah" />
        <p style={{ margin: "-6px 0 12px", fontSize: 12.5, color: C.muted }}>Tautkan ke jamaah lain yang berkaitan (suami, istri, anak, pendamping, dll). Berguna agar keluarga tidak terpisah.</p>
        {(f.relasi || []).map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <select className="field" style={{ ...inputStyle, flex: 2 }} value={r.id} onChange={(e) => setRel(i, "id", e.target.value)}>
              <option value="">— pilih jamaah —</option>
              {others.map((j) => <option key={j.id} value={j.id}>{j.nama}</option>)}
            </select>
            <select className="field" style={{ ...inputStyle, flex: 1 }} value={r.hubungan} onChange={(e) => setRel(i, "hubungan", e.target.value)}>
              {HUB.map((h) => <option key={h}>{h}</option>)}
            </select>
            <button className="btn iconbtn" onClick={() => delRel(i)} style={{ background: C.dangerSoft, color: C.danger, padding: 10, borderRadius: 10 }}><X size={15} /></button>
          </div>
        ))}
        <button className="btn" onClick={addRel} style={{ background: C.greenSoft, color: C.green, padding: "8px 14px", borderRadius: 10, marginTop: 2 }}><UserPlus size={16} /> Tambah relasi</button>

        <Section title="Kebutuhan khusus & kesehatan" />
        <Grid>
          <div style={{ gridColumn: "1 / -1" }}><Label>Riwayat penyakit</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.riwayatPenyakit} onChange={(e) => set("riwayatPenyakit", e.target.value)} placeholder="cth. Hipertensi, obat rutin pagi hari…" /></div>
          <div><Label>Catatan pendamping</Label><input className="field" style={inputStyle} value={f.pendamping} onChange={(e) => set("pendamping", e.target.value)} placeholder="cth. didampingi menantu (non-jamaah)" /></div>
          <div>
            <Label>Kursi roda</Label>
            <button className="btn" onClick={() => set("kursiRoda", !f.kursiRoda)} style={{ width: "100%", justifyContent: "space-between", padding: "10px 14px", borderRadius: 11, border: `1px solid ${f.kursiRoda ? C.green : C.border}`, background: f.kursiRoda ? C.greenSoft : "#fff", color: f.kursiRoda ? C.green : C.muted }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Accessibility size={17} /> {f.kursiRoda ? "Membutuhkan kursi roda" : "Tidak perlu"}</span>
              <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${f.kursiRoda ? C.green : C.border}`, background: f.kursiRoda ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{f.kursiRoda && <Check size={13} color="#fff" />}</span>
            </button>
          </div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Catatan pembimbing</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. Perlu bantuan naik-turun bus, kamar dekat lift…" /></div>
        </Grid>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BUS PAGE  — klik untuk isi, drag & drop untuk tukar
   ============================================================ */
const BUS_ROWS = 15;
const COLS = ["A", "B", "C", "D"];
const allSeatIds = () => { const a = []; for (let r = 1; r <= BUS_ROWS; r++) COLS.forEach((c) => a.push(`${r}${c}`)); return a; };

function BusPage({ list, seats, setSeats, byId }) {
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);
  const [picker, setPicker] = useState(null); // seatId being assigned

  const seatIds = allSeatIds();
  const seated = new Set(Object.values(seats).filter(Boolean).map(Number));
  const pool = list.filter((j) => !seated.has(j.id));

  const assign = (seatId, jamaahId) => setSeats((s) => { const n = { ...s }; for (const k of Object.keys(n)) if (Number(n[k]) === Number(jamaahId)) delete n[k]; n[seatId] = Number(jamaahId); return n; });
  const clearSeat = (seatId) => setSeats((s) => { const n = { ...s }; delete n[seatId]; return n; });
  const swap = (a, b) => setSeats((s) => { const n = { ...s }; const va = n[a], vb = n[b]; if (vb == null) delete n[a]; else n[a] = vb; if (va == null) delete n[b]; else n[b] = va; return n; });

  const onDrop = (target) => {
    if (!drag) return;
    if (drag.type === "pool") assign(target, drag.jamaahId);
    else if (drag.type === "seat" && drag.seatId !== target) swap(drag.seatId, target);
    setDrag(null); setOver(null);
  };

  const Seat = ({ id }) => {
    const jid = seats[id]; const j = jid ? byId(jid) : null;
    const isOver = over === id;
    return (
      <div className={`seat${isOver ? " dragover" : ""}`}
        draggable={!!j}
        onDragStart={() => j && setDrag({ type: "seat", seatId: id })}
        onDragEnd={() => { setDrag(null); setOver(null); }}
        onDragOver={(e) => { e.preventDefault(); setOver(id); }}
        onDragLeave={() => setOver((o) => (o === id ? null : o))}
        onDrop={(e) => { e.preventDefault(); onDrop(id); }}
        onClick={() => setPicker(id)}
        title={j ? j.nama : `Kursi ${id} (kosong)`}
        style={{
          width: 58, height: 54, borderRadius: 11, cursor: "pointer", flexShrink: 0,
          background: j ? C.green : "#fff", color: j ? "#fff" : C.muted,
          border: `1.5px solid ${j ? C.greenDeep : C.border}`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: 4, position: "relative", overflow: "hidden",
        }}>
        <span style={{ position: "absolute", top: 3, left: 6, fontSize: 9, fontWeight: 700, opacity: .7 }}>{id}</span>
        {j ? (
          <>
            <span style={{ fontWeight: 800, fontSize: 13, lineHeight: 1 }}>{inisial(j.nama)}</span>
            <span style={{ fontSize: 8.5, marginTop: 3, maxWidth: 56, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.nama.split(" ")[j.nama.split(" ").length - 1]}</span>
            {j.kursiRoda && <Accessibility size={11} style={{ position: "absolute", bottom: 3, right: 4, opacity: .85 }} />}
          </>
        ) : <Armchair size={20} color={C.border} />}
      </div>
    );
  };

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Denah Kursi Bis</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Klik kursi untuk menempatkan jamaah. Seret (drag) kursi untuk menukar posisi. {Object.keys(seats).length}/{seatIds.length} kursi terisi.</p>
      </div>

      <div className="bus-layout">
        {/* BUS */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 22, padding: "20px 18px", overflowX: "auto" }} className="kbih-scroll">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 14px", borderBottom: `1px dashed ${C.border}`, marginBottom: 14, minWidth: 320 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.muted }}><Bus size={16} /> Depan bis</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.muted }}>Sopir <span style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${C.border}`, display: "inline-block" }} /></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 320 }}>
            {Array.from({ length: BUS_ROWS }, (_, r) => r + 1).map((r) => (
              <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
                <Seat id={`${r}A`} /><Seat id={`${r}B`} />
                <div style={{ width: 22, textAlign: "center", fontSize: 10, color: C.border, fontWeight: 700, flexShrink: 0 }}>{r}</div>
                <Seat id={`${r}C`} /><Seat id={`${r}D`} />
              </div>
            ))}
          </div>
        </div>

        {/* POOL */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 16 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.ink, marginBottom: 4 }}>Belum dapat kursi</div>
          <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 12 }}>Seret nama ke kursi, atau klik kursi lalu pilih.</div>
          {pool.length === 0 ? (
            <div style={{ fontSize: 12.5, color: C.green, background: C.greenSoft, padding: "10px 12px", borderRadius: 10, display: "flex", gap: 6, alignItems: "center" }}><CheckCircle2 size={15} /> Semua jamaah sudah dapat kursi.</div>
          ) : pool.map((j) => (
            <div key={j.id} draggable onDragStart={() => setDrag({ type: "pool", jamaahId: j.id })} onDragEnd={() => setDrag(null)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 8, cursor: "grab", background: "#fff" }}>
              <GripVertical size={15} color={C.border} />
              <Avatar foto={j.foto} nama={j.nama} size={32} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>{j.nama}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Rmb {j.rombongan || "-"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PICKER */}
      {picker && (
        <Modal onClose={() => setPicker(null)} width={420}>
          <SeatPicker seatId={picker} current={seats[picker] ? byId(seats[picker]) : null} pool={pool} onAssign={(jid) => { assign(picker, jid); setPicker(null); }} onClear={() => { clearSeat(picker); setPicker(null); }} onClose={() => setPicker(null)} />
        </Modal>
      )}
    </div>
  );
}

function SeatPicker({ seatId, current, pool, onAssign, onClear, onClose }) {
  const [q, setQ] = useState("");
  const opts = pool.filter((j) => j.nama.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Kursi {seatId}</h3>
        <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
      </div>
      {current ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.greenSoft, padding: "10px 12px", borderRadius: 12, margin: "10px 0 14px" }}>
          <Avatar foto={current.foto} nama={current.nama} size={36} />
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{current.nama}</div><div style={{ fontSize: 11.5, color: C.muted }}>menempati kursi ini</div></div>
          <button className="btn" onClick={onClear} style={{ background: C.dangerSoft, color: C.danger, padding: "7px 12px", borderRadius: 10, fontSize: 12.5 }}><X size={14} /> Kosongkan</button>
        </div>
      ) : <p style={{ margin: "8px 0 12px", fontSize: 13, color: C.muted }}>Pilih jamaah untuk kursi ini:</p>}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <Search size={15} color={C.muted} style={{ position: "absolute", left: 11, top: 11 }} />
        <input className="field" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama…" style={{ ...inputStyle, paddingLeft: 34 }} />
      </div>
      <div style={{ maxHeight: 260, overflow: "auto" }} className="kbih-scroll">
        {opts.length === 0 ? <div style={{ fontSize: 13, color: C.muted, padding: 10, textAlign: "center" }}>Tidak ada jamaah tersedia.</div> : opts.map((j) => (
          <button key={j.id} className="btn" onClick={() => onAssign(j.id)} style={{ width: "100%", justifyContent: "flex-start", gap: 10, padding: "9px 10px", borderRadius: 11, background: "#fff", border: `1px solid ${C.border}`, marginBottom: 7 }}>
            <Avatar foto={j.foto} nama={j.nama} size={32} />
            <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 700 }}>{j.nama}</div><div style={{ fontSize: 11, color: C.muted }}>Rmb {j.rombongan || "-"} · {labelUsia(hitungUsia(j.tanggalLahir))?.text || "—"}</div></div>
            <ChevronRight size={16} color={C.border} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   AGENDA PAGE
   ============================================================ */
function AgendaPage({ agenda, setAgenda, list, absen, setAbsen, bolehKelola = true }) {
  const [mode, setMode] = useState("list"); // list | form | absen
  const [editing, setEditing] = useState(null);
  const [absenId, setAbsenId] = useState(null);

  const sorted = [...agenda].sort((a, b) => (a.tanggal + a.waktu).localeCompare(b.tanggal + b.waktu));
  const remove = (id) => { if (window.confirm("Hapus agenda ini?")) setAgenda((a) => a.filter((x) => x.id !== id)); };
  const save = (d) => { if (d.id) setAgenda((a) => a.map((x) => (x.id === d.id ? d : x))); else setAgenda((a) => [...a, { ...d, id: Date.now() }]); setMode("list"); };

  if (mode === "absen") { const ag = agenda.find((a) => a.id === absenId); if (ag) return <AbsenEditor ag={ag} list={list} absen={absen} setAbsen={setAbsen} onBack={() => setMode("list")} />; }
  if (mode === "form") return <AgendaForm initial={editing} onCancel={() => setMode("list")} onSave={save} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div><h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Agenda Perjalanan</h2><p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Jadwal kegiatan selama bimbingan & di tanah suci.</p></div>
        {bolehKelola && <button className="btn" onClick={() => { setEditing(null); setMode("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Tambah Agenda</button>}
      </div>

      {sorted.length === 0 ? <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}><CalendarDays size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada agenda.</p></div> : (
        <div style={{ position: "relative", paddingLeft: 8 }}>
          {sorted.map((a, idx) => {
            const rec = absen[a.id] || {}; const hadir = Object.values(rec).filter((v) => v === "hadir").length;
            return (
              <div key={a.id} style={{ display: "flex", gap: 16, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 14, height: 14, borderRadius: 99, background: C.green, border: `3px solid ${C.greenSoft}`, marginTop: 22 }} />
                  {idx < sorted.length - 1 && <div style={{ width: 2, flex: 1, background: C.border, margin: "4px 0" }} />}
                </div>
                <div className="card-hover" style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, marginBottom: 14 }}>
                  {a.gambar && <img src={a.gambar.data} alt={a.judul} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, marginBottom: 12, display: "block" }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
                        <Badge bg={C.greenSoft} color={C.green} icon={CalendarDays}>{tglRingkas(a.tanggal)}</Badge>
                        <Badge bg={C.goldSoft} color={C.goldDeep} icon={Clock}>{a.waktu} WIB/AST</Badge>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{a.judul}</div>
                      <div style={{ fontSize: 13, color: C.muted, marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}><MapPin size={13} /> {a.lokasi || "—"}</div>
                      {a.keterangan && <div style={{ fontSize: 13, color: C.ink, marginTop: 7, lineHeight: 1.5 }}>{a.keterangan}</div>}
                      {a.materi && (
                        <button className="btn" onClick={() => bukaBerkas(a.materi)} style={{ marginTop: 10, background: C.dangerSoft, color: C.danger, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                          <Paperclip size={14} /> Materi: {a.materi.nama}{a.materi.ukuran ? <span style={{ fontWeight: 500, opacity: .8 }}> ({formatUkuran(a.materi.ukuran)})</span> : null}
                        </button>
                      )}
                    </div>
                    {bolehKelola && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-end" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn iconbtn" onClick={() => { setEditing(a); setMode("form"); }} style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={15} /></button>
                          <button className="btn iconbtn" onClick={() => remove(a.id)} style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                        </div>
                        <button className="btn" onClick={() => { setAbsenId(a.id); setMode("absen"); }} style={{ background: C.green, color: "#fff", padding: "8px 14px", borderRadius: 10, fontSize: 13 }}><ClipboardCheck size={15} /> Absensi ({hadir}/{list.length})</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AgendaForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial || { tanggal: "", waktu: "", judul: "", lokasi: "", keterangan: "", gambar: null, materi: null });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim() && f.tanggal;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 640, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Agenda" : "Tambah Agenda"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><Label>Tanggal</Label><input className="field" type="date" style={inputStyle} value={f.tanggal} onChange={(e) => set("tanggal", e.target.value)} /></div>
          <div><Label>Waktu</Label><input className="field" type="time" style={inputStyle} value={f.waktu} onChange={(e) => set("waktu", e.target.value)} /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Nama kegiatan</Label><input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Ziarah Kota Madinah" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Lokasi</Label><input className="field" style={inputStyle} value={f.lokasi} onChange={(e) => set("lokasi", e.target.value)} placeholder="cth. Masjid Nabawi" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Keterangan</Label><textarea className="field" rows={3} style={{ ...inputStyle, resize: "vertical" }} value={f.keterangan} onChange={(e) => set("keterangan", e.target.value)} placeholder="Detail kegiatan, titik kumpul, dll…" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Gambar kegiatan (opsional)</Label>
            <UploadGambar nilai={f.gambar} onChange={(v) => set("gambar", v)} label="Unggah gambar kegiatan" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Materi pembimbing (tautan PDF, opsional)</Label>
            <TautanBerkas nilai={f.materi} onChange={(v) => set("materi", v)} label="Tambah tautan materi (PDF)" />
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Materi terbuka langsung dari kartu agenda saat di lapangan.</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

function AbsenEditor({ ag, list, absen, setAbsen, onBack }) {
  const rec = absen[ag.id] || {};
  const setStatus = (jid, st) => setAbsen((a) => ({ ...a, [ag.id]: { ...(a[ag.id] || {}), [jid]: st } }));
  const setAll = (st) => setAbsen((a) => ({ ...a, [ag.id]: Object.fromEntries(list.map((j) => [j.id, st])) }));
  const count = (st) => list.filter((j) => rec[j.id] === st).length;

  return (
    <div className="fade">
      <button className="btn" onClick={onBack} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Kembali ke agenda</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, padding: "18px 22px", color: "#fff" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Badge bg="#ffffff26" color="#fff" icon={CalendarDays}>{tglRingkas(ag.tanggal)}</Badge>
            <Badge bg="#ffffff26" color="#fff" icon={Clock}>{ag.waktu}</Badge>
          </div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 700 }}>{ag.judul}</div>
          <div style={{ fontSize: 13, color: "#cfe0d6", marginTop: 2 }}>Absensi kehadiran jamaah</div>
        </div>
        <div style={{ padding: "14px 20px", display: "flex", gap: 10, flexWrap: "wrap", borderBottom: `1px solid ${C.border}`, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: C.muted, marginRight: 4 }}>Tandai semua:</span>
          {Object.entries(STAT).map(([k, v]) => <button key={k} className="btn" onClick={() => setAll(k)} style={{ background: v.bg, color: v.color, padding: "6px 12px", borderRadius: 9, fontSize: 12.5 }}><v.icon size={14} /> {v.label}</button>)}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 12.5 }}>
            <span style={{ color: C.green, fontWeight: 700 }}>Hadir {count("hadir")}</span>
            <span style={{ color: C.goldDeep, fontWeight: 700 }}>Izin {count("izin")}</span>
            <span style={{ color: C.danger, fontWeight: 700 }}>Tidak {count("tidak")}</span>
          </div>
        </div>
        <div style={{ padding: "8px 20px 20px" }}>
          {list.map((j) => (
            <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${C.border}` }}>
              <Avatar foto={j.foto} nama={j.nama} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{j.nama}</div>
                <div style={{ fontSize: 11.5, color: C.muted }}>Rmb {j.rombongan || "-"}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(STAT).map(([k, v]) => {
                  const on = rec[j.id] === k;
                  return <button key={k} className="btn" onClick={() => setStatus(j.id, k)} title={v.label}
                    style={{ background: on ? v.color : v.bg, color: on ? "#fff" : v.color, padding: "7px 10px", borderRadius: 9, fontSize: 12.5, fontWeight: 700, border: on ? "none" : `1px solid ${v.color}22` }}>
                    <v.icon size={15} /> <span style={{ display: "inline" }}>{v.label}</span>
                  </button>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ABSENSI PAGE (rekap)
   ============================================================ */
function AbsensiPage({ agenda, list, absen, setAbsen }) {
  const [mode, setMode] = useState("rekap"); // rekap | per
  const [absenId, setAbsenId] = useState(null);
  const sorted = [...agenda].sort((a, b) => (a.tanggal + a.waktu).localeCompare(b.tanggal + b.waktu));

  if (mode === "per") { const ag = agenda.find((a) => a.id === absenId); if (ag) return <AbsenEditor ag={ag} list={list} absen={absen} setAbsen={setAbsen} onBack={() => setMode("rekap")} />; }

  const rateOf = (jid) => { let h = 0; sorted.forEach((a) => { if ((absen[a.id] || {})[jid] === "hadir") h++; }); return sorted.length ? Math.round((h / sorted.length) * 100) : 0; };

  return (
    <div className="fade">
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Rekap Absensi</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Ringkasan kehadiran seluruh jamaah di tiap agenda. Klik nama agenda untuk mengisi absensi.</p>
      </div>

      {sorted.length === 0 || list.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}><ClipboardCheck size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Butuh minimal 1 agenda & 1 jamaah untuk rekap.</p></div>
      ) : (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, overflow: "auto" }} className="kbih-scroll">
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 620 }}>
            <thead>
              <tr>
                <th style={{ position: "sticky", left: 0, background: C.surface, textAlign: "left", padding: "14px 16px", fontSize: 12, color: C.muted, borderBottom: `2px solid ${C.border}`, zIndex: 2 }}>Jamaah</th>
                {sorted.map((a) => (
                  <th key={a.id} onClick={() => { setAbsenId(a.id); setMode("per"); }} title="Isi absensi" style={{ padding: "12px 8px", borderBottom: `2px solid ${C.border}`, cursor: "pointer", minWidth: 92 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: C.green }}>{a.judul}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{tglRingkas(a.tanggal)}</div>
                  </th>
                ))}
                <th style={{ padding: "12px 14px", borderBottom: `2px solid ${C.border}`, fontSize: 12, color: C.muted }}>% Hadir</th>
              </tr>
            </thead>
            <tbody>
              {list.map((j) => (
                <tr key={j.id}>
                  <td style={{ position: "sticky", left: 0, background: C.surface, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Avatar foto={j.foto} nama={j.nama} size={30} />
                      <div><div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>{j.nama}</div><div style={{ fontSize: 10.5, color: C.muted }}>Rmb {j.rombongan || "-"}</div></div>
                    </div>
                  </td>
                  {sorted.map((a) => {
                    const st = (absen[a.id] || {})[j.id]; const v = st ? STAT[st] : null;
                    return <td key={a.id} style={{ textAlign: "center", borderBottom: `1px solid ${C.border}` }}>
                      {v ? <span style={{ display: "inline-flex", width: 26, height: 26, borderRadius: 8, background: v.bg, color: v.color, alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>{v.huruf}</span> : <span style={{ color: C.border }}>·</span>}
                    </td>;
                  })}
                  <td style={{ textAlign: "center", borderBottom: `1px solid ${C.border}`, fontWeight: 800, color: rateOf(j.id) >= 75 ? C.green : rateOf(j.id) >= 50 ? C.goldDeep : C.danger }}>{rateOf(j.id)}%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ position: "sticky", left: 0, background: C.bg, padding: "10px 16px", fontSize: 12, fontWeight: 700, color: C.muted }}>Hadir / total</td>
                {sorted.map((a) => { const h = list.filter((j) => (absen[a.id] || {})[j.id] === "hadir").length; return <td key={a.id} style={{ textAlign: "center", background: C.bg, fontSize: 12, fontWeight: 700, color: C.green }}>{h}/{list.length}</td>; })}
                <td style={{ background: C.bg }} />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
        {Object.entries(STAT).map(([k, v]) => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: C.muted }}><span style={{ width: 18, height: 18, borderRadius: 5, background: v.bg, color: v.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10 }}>{v.huruf}</span> {v.label}</span>)}
      </div>
    </div>
  );
}

/* ============================================================
   LOKASI PAGE — jarak & arah dari HP pembimbing
   ============================================================ */
/* ---------- kompas: arah hadap HP ----------
   Memakai perhitungan terkoreksi kemiringan (tilt-compensated)
   supaya arah tetap tepat walau HP dimiringkan, ditambah
   peredam getaran agar panah tidak bergoyang-goyang.
-------------------------------------------- */
const DEG = Math.PI / 180;

// Menghitung arah kompas sebenarnya dari kemiringan perangkat
function hitungArahKompas(alpha, beta, gamma) {
  if (alpha == null) return null;
  const x = (beta || 0) * DEG, y = (gamma || 0) * DEG, z = alpha * DEG;
  const cX = Math.cos(x), cY = Math.cos(y), cZ = Math.cos(z);
  const sX = Math.sin(x), sY = Math.sin(y), sZ = Math.sin(z);
  const Vx = -cZ * sY - sZ * sX * cY;
  const Vy = -sZ * sY + cZ * sX * cY;
  let arah = Math.atan2(Vx, Vy) * (180 / Math.PI);
  return ((arah % 360) + 360) % 360;
}

const sudutLayar = () => {
  const o = window.screen?.orientation?.angle;
  if (typeof o === "number") return o;
  if (typeof window.orientation === "number") return window.orientation;
  return 0;
};

// Rata-rata melingkar supaya peralihan 359° → 0° tidak melompat
function haluskanArah(lama, baru, bobot = 0.25) {
  if (lama == null) return baru;
  let selisih = ((baru - lama + 540) % 360) - 180;
  return ((lama + selisih * bobot) % 360 + 360) % 360;
}

function useArahHP() {
  const [arah, setArah] = useState(null);
  const [status, setStatus] = useState("mati"); // mati | aktif | menunggu | ditolak | tidakAda
  const [andal, setAndal] = useState(true);
  const halusRef = useRef(null);
  const jenisRef = useRef(null);
  const bingkaiRef = useRef(null);

  const tangani = (e) => {
    let h = null;

    if (typeof e.webkitCompassHeading === "number" && !isNaN(e.webkitCompassHeading)) {
      // iOS: sudah berupa arah kompas sejati
      h = e.webkitCompassHeading;
      setAndal(e.webkitCompassAccuracy == null || e.webkitCompassAccuracy >= 0);
    } else if (e.alpha != null) {
      h = hitungArahKompas(e.alpha, e.beta, e.gamma);
      // Sesuaikan bila layar diputar (mode lanskap)
      if (h != null) h = (h + sudutLayar() + 360) % 360;
      setAndal(e.absolute === true || jenisRef.current === "deviceorientationabsolute");
    }

    if (h == null || isNaN(h)) return;
    halusRef.current = haluskanArah(halusRef.current, ((h % 360) + 360) % 360);

    // Perbarui tampilan maksimal sekali per bingkai layar
    if (bingkaiRef.current) return;
    bingkaiRef.current = requestAnimationFrame(() => {
      bingkaiRef.current = null;
      setArah(halusRef.current);
      setStatus((st) => (st === "menunggu" ? "aktif" : st));
    });
  };

  const nyalakan = async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setStatus("tidakAda"); return;
    }
    try {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const hasil = await DeviceOrientationEvent.requestPermission();
        if (hasil !== "granted") { setStatus("ditolak"); return; }
      }
    } catch { setStatus("ditolak"); return; }

    // Utamakan sensor yang mengacu ke utara sejati
    const jenis = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : "deviceorientation";
    jenisRef.current = jenis;
    window.addEventListener(jenis, tangani, true);
    setStatus("menunggu");

    // Kalau versi absolut tidak mengirim data, pakai versi biasa
    if (jenis === "deviceorientationabsolute") {
      setTimeout(() => {
        if (halusRef.current == null) {
          window.addEventListener("deviceorientation", tangani, true);
          jenisRef.current = "keduanya";
        }
      }, 1200);
    }
  };

  const matikan = () => {
    window.removeEventListener("deviceorientationabsolute", tangani, true);
    window.removeEventListener("deviceorientation", tangani, true);
    if (bingkaiRef.current) cancelAnimationFrame(bingkaiRef.current);
    bingkaiRef.current = null;
    halusRef.current = null;
    jenisRef.current = null;
    setArah(null);
    setStatus("mati");
  };

  useEffect(() => () => {
    window.removeEventListener("deviceorientationabsolute", tangani, true);
    window.removeEventListener("deviceorientation", tangani, true);
    if (bingkaiRef.current) cancelAnimationFrame(bingkaiRef.current);
  }, []);

  return { arah, status, andal, nyalakan, matikan };
}

/* ---------- lokasi yang tetap hidup antar halaman ---------- */
function useLokasiGlobal() {
  const [pos, setPos] = useState(null);
  const [aktif, setAktif] = useState(false);
  const [galat, setGalat] = useState("");
  const idRef = useRef(null);
  const kompas = useArahHP();

  const nyalakan = () => {
    if (!navigator.geolocation) { setGalat("Perangkat/browser ini tidak mendukung deteksi lokasi."); return; }
    if (idRef.current != null) return;
    setGalat(""); setAktif(true);
    kompas.nyalakan();
    idRef.current = navigator.geolocation.watchPosition(
      (p) => { setPos({ lat: p.coords.latitude, lng: p.coords.longitude, akurasi: p.coords.accuracy, waktu: p.timestamp }); setGalat(""); },
      (err) => {
        setAktif(false); idRef.current = null;
        setGalat(err.code === 1
          ? "Izin lokasi ditolak. Aktifkan izin lokasi untuk situs ini di pengaturan browser HP."
          : "Gagal membaca lokasi. Pastikan GPS aktif dan coba lagi.");
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 20000 }
    );
  };

  const matikan = () => {
    if (idRef.current != null) navigator.geolocation.clearWatch(idRef.current);
    idRef.current = null;
    setAktif(false);
    kompas.matikan();
  };

  // Ambil posisi sekali saja (untuk tombol darurat, tanpa perlu menyalakan pemantauan)
  const ambilSekali = () => new Promise((selesai, gagal) => {
    if (pos) return selesai(pos);
    if (!navigator.geolocation) return gagal(new Error("Perangkat tidak mendukung deteksi lokasi."));
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const n = { lat: p.coords.latitude, lng: p.coords.longitude, akurasi: p.coords.accuracy, waktu: p.timestamp };
        setPos(n); selesai(n);
      },
      (e) => gagal(new Error(e.code === 1 ? "Izin lokasi ditolak." : "Gagal membaca lokasi.")),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  });

  useEffect(() => () => { if (idRef.current != null) navigator.geolocation.clearWatch(idRef.current); }, []);

  return { pos, aktif, galat, nyalakan, matikan, ambilSekali, kompas };
}

function LokasiPage({ titikPenting, setTitikPenting, titikKumpul, setTitikKumpul, lokasi }) {
  const [modal, setModal] = useState(null); // 'penting' | 'kumpul'
  const { pos, aktif: tracking, galat: errMsg, nyalakan: mulaiLokasi, matikan: berhentiLokasi, kompas } = lokasi;

  return (
    <div className="fade">
      <div style={{ marginBottom: 18 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Lokasi, Jarak & Arah</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Jarak dan arah dihitung dari posisi HP Anda saat ini menuju tiap titik.</p>
      </div>

      {/* status lokasi saya */}
      <div style={{ background: tracking ? C.greenSoft : C.surface, border: `1px solid ${tracking ? C.green + "44" : C.border}`, borderRadius: 16, padding: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: tracking ? C.green : C.bg, color: tracking ? "#fff" : C.muted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Compass size={21} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{tracking ? "Lokasi Anda aktif" : "Lokasi Anda belum aktif"}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>
            {pos ? <>Koordinat: {pos.lat.toFixed(5)}, {pos.lng.toFixed(5)} · akurasi ±{Math.round(pos.akurasi)} m</> : "Aktifkan untuk melihat jarak & arah ke setiap titik."}
          </div>
          {errMsg && <div style={{ fontSize: 12.5, color: C.danger, marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}><AlertTriangle size={13} /> {errMsg}</div>}
          {tracking && (
            <div style={{ fontSize: 12, marginTop: 5, display: "flex", alignItems: "center", gap: 6, color: kompas.status === "aktif" ? C.green : C.muted, flexWrap: "wrap" }}>
              <Compass size={13} />
              {kompas.status === "aktif" && kompas.arah != null
                ? <>Kompas aktif — HP menghadap {arahMataAngin(kompas.arah)} ({Math.round(kompas.arah)}°).{!kompas.andal && " Akurasi rendah — gerakkan HP membentuk angka 8 untuk kalibrasi."}</>
                : kompas.status === "menunggu"
                ? <>Membaca sensor arah… gerakkan HP membentuk angka 8 untuk kalibrasi.</>
                : kompas.status === "ditolak"
                ? <>Izin sensor arah ditolak — panah memakai arah dari Utara.</>
                : <>Sensor arah tidak tersedia — panah memakai arah dari Utara.
                    <button className="btn" onClick={kompas.nyalakan} style={{ background: "transparent", color: C.green, padding: 0, fontSize: 12, textDecoration: "underline" }}>Coba nyalakan</button>
                  </>}
            </div>
          )}
        </div>
        {tracking ? (
          <button className="btn" onClick={berhentiLokasi} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "9px 16px", borderRadius: 11 }}>Matikan</button>
        ) : (
          <button className="btn" onClick={mulaiLokasi} style={{ background: C.green, color: "#fff", padding: "9px 16px", borderRadius: 11 }}><LocateFixed size={16} /> Aktifkan Lokasi Saya</button>
        )}
      </div>

      {/* titik kumpul */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.green }}><Flag size={16} /> Titik Kumpul</span>
        <button className="btn" onClick={() => setModal("kumpul")} style={{ background: C.greenSoft, color: C.green, padding: "7px 13px", borderRadius: 10, fontSize: 12.5 }}><Plus size={15} /> Tambah</button>
      </div>
      {titikKumpul.length === 0 ? (
        <div style={{ fontSize: 12.5, color: C.muted, background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}>
          Belum ada titik kumpul. Tekan <strong>Tambah</strong> saat Anda berdiri di lokasi kumpul agar koordinatnya tersimpan tepat.
        </div>
      ) : (
        <div className="kartu-grid" style={{ marginBottom: 24 }}>
          {titikKumpul.map((t) => (
            <TitikCard key={t.id} arahHP={kompas.arah} pos={pos} lat={t.lat} lng={t.lng} nama={t.nama} catatan={t.catatan} gambar={t.gambar} accent={C.green} accentBg={C.greenSoft} icon={Flag}
              footer={<button className="btn" onClick={() => setTitikKumpul((s) => s.filter((x) => x.id !== t.id))} style={{ marginTop: 10, background: C.bg, color: C.muted, padding: "6px 11px", borderRadius: 9, fontSize: 11.5 }}><Trash2 size={13} /> Hapus</button>} />
          ))}
        </div>
      )}

      {/* titik penting */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.goldDeep }}><Landmark size={16} /> Lokasi Penting</span>
        <button className="btn" onClick={() => setModal("penting")} style={{ background: C.goldSoft, color: C.goldDeep, padding: "7px 13px", borderRadius: 10, fontSize: 12.5 }}><Plus size={15} /> Tambah</button>
      </div>
      <div className="kartu-grid">
        {titikPenting.map((t) => (
          <TitikCard key={t.id} arahHP={kompas.arah} pos={pos} lat={t.lat} lng={t.lng} nama={t.nama} catatan={t.catatan} gambar={t.gambar} accent={C.goldDeep} accentBg={C.goldSoft} icon={Landmark}
            footer={<button className="btn" onClick={() => setTitikPenting((s) => s.filter((x) => x.id !== t.id))} style={{ marginTop: 10, background: C.bg, color: C.muted, padding: "6px 11px", borderRadius: 9, fontSize: 11.5 }}><Trash2 size={13} /> Hapus</button>} />
        ))}
      </div>

      {modal === "kumpul" && <TitikModal judul="Tambah Titik Kumpul" ikon={Flag} warna={C.green} contohNama="cth. Pintu King Abdul Aziz (Gate 1)" onClose={() => setModal(null)} onSave={(t) => { setTitikKumpul((s) => [...s, t]); setModal(null); }} />}
      {modal === "penting" && <TitikModal judul="Tambah Lokasi Penting" ikon={Landmark} warna={C.goldDeep} contohNama="cth. Hotel Al-Massa, Makkah" onClose={() => setModal(null)} onSave={(t) => { setTitikPenting((s) => [...s, t]); setModal(null); }} />}
    </div>
  );
}

function TitikCard({ pos, lat, lng, nama, catatan, accent, accentBg, icon: Icon, footer, avatarFoto, gambar, arahHP }) {
  const punyaPos = pos && lat != null && lng != null;
  const jarak = punyaPos ? jarakMeter(pos.lat, pos.lng, lat, lng) : null;
  const arah = punyaPos ? bearingDerajat(pos.lat, pos.lng, lat, lng) : null;
  // Kalau sensor arah HP aktif, panah diputar relatif terhadap arah hadap HP
  const pakaiKompas = punyaPos && arahHP != null;
  const putaran = punyaPos ? (pakaiKompas ? (arah - arahHP + 360) % 360 : arah) : 0;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 15 }}>
      {gambar && <img src={gambar.data} alt={nama} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 11, marginBottom: 12, display: "block" }} />}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        {avatarFoto !== undefined ? <Avatar foto={avatarFoto} nama={nama} size={38} /> : (
          <div style={{ width: 38, height: 38, borderRadius: 10, background: accentBg, color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={19} /></div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{nama}</div>
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{catatan}</div>
        </div>
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        {punyaPos ? (
          <>
            <div style={{
              width: 50, height: 50, borderRadius: 99, flexShrink: 0, position: "relative",
              border: `2px solid ${pakaiKompas ? accent : accent + "33"}`,
              background: pakaiKompas ? accent + "0f" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* penanda Utara ikut berputar mengikuti arah HP */}
              {pakaiKompas && (
                <span style={{
                  position: "absolute", inset: 0,
                  transform: `rotate(${(360 - arahHP) % 360}deg)`,
                  transition: "transform .18s linear",
                }}>
                  <span style={{ position: "absolute", top: 1, left: "50%", transform: "translateX(-50%)", fontSize: 8, fontWeight: 800, color: C.muted }}>U</span>
                </span>
              )}
              <Navigation size={21} color={accent} fill={pakaiKompas ? accent : "none"}
                style={{ transform: `rotate(${putaran}deg)`, transition: "transform .18s linear" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: accent, lineHeight: 1 }}>{formatJarak(jarak)}</div>
              <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>
                {pakaiKompas ? <><strong style={{ color: accent }}>{putarKeInstruksi(putaran)}</strong> · {arahMataAngin(arah)}</> : <>{arahMataAngin(arah)} · {Math.round(arah)}° dari Utara</>}
              </div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}><Compass size={15} color={C.border} /> Aktifkan lokasi Anda untuk lihat jarak & arah</div>
        )}
      </div>

      {lat != null && lng != null && (
        <div style={{ display: "flex", gap: 7, marginTop: 11 }}>
          <a href={mapsRute(lat, lng)} target="_blank" rel="noreferrer" className="btn"
            style={{ flex: 1, justifyContent: "center", textDecoration: "none", background: C.greenSoft, color: C.green, padding: "8px 10px", borderRadius: 10, fontSize: 12.5 }}>
            <Route size={14} /> Rute
          </a>
          <a href={mapsCari(lat, lng)} target="_blank" rel="noreferrer" className="btn"
            style={{ flex: 1, justifyContent: "center", textDecoration: "none", background: C.bg, color: C.muted, border: `1px solid ${C.border}`, padding: "8px 10px", borderRadius: 10, fontSize: 12.5 }}>
            <MapIcon size={14} /> Peta
          </a>
        </div>
      )}
      {footer}
    </div>
  );
}

/* Mengubah sudut relatif menjadi kalimat arah yang mudah diikuti */
function putarKeInstruksi(d) {
  const a = ((d % 360) + 360) % 360;
  if (a < 20 || a > 340) return "Lurus ke depan";
  if (a < 70) return "Serong kanan";
  if (a < 110) return "Ke kanan";
  if (a < 160) return "Serong kanan belakang";
  if (a < 200) return "Putar balik";
  if (a < 250) return "Serong kiri belakang";
  if (a < 290) return "Ke kiri";
  return "Serong kiri";
}

function TitikModal({ judul, ikon: Ikon, warna, contohNama, onClose, onSave }) {
  const [nama, setNama] = useState("");
  const [catatan, setCatatan] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [gambar, setGambar] = useState(null);
  const [geoMsg, setGeoMsg] = useState("");
  const canSave = nama.trim() && lat && lng;

  const gunakanLokasiSaya = () => {
    if (!navigator.geolocation) { setGeoMsg("Perangkat ini tidak mendukung deteksi lokasi."); return; }
    setGeoMsg("Mendeteksi lokasi…");
    navigator.geolocation.getCurrentPosition(
      (p) => { setLat(String(p.coords.latitude)); setLng(String(p.coords.longitude)); setGeoMsg("Koordinat tersimpan dari lokasi Anda saat ini."); },
      () => setGeoMsg("Gagal mendapatkan lokasi. Coba lagi atau isi manual."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <Modal onClose={onClose} width={440}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}><Ikon size={18} color={warna} /> {judul}</h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>Nama titik</label>
        <input className="field" style={{ ...inputStyle, marginBottom: 14 }} value={nama} onChange={(e) => setNama(e.target.value)} placeholder={contohNama} />
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>Catatan (opsional)</label>
        <input className="field" style={{ ...inputStyle, marginBottom: 14 }} value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="cth. Kumpul 15 menit sebelum keberangkatan" />

        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>Foto penanda lokasi (opsional)</label>
        <div style={{ marginBottom: 14 }}><UploadGambar nilai={gambar} onChange={setGambar} tinggi={120} label="Unggah foto lokasi" /></div>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: -8, marginBottom: 14 }}>Foto sangat membantu jamaah mengenali titik kumpul di tempat yang ramai.</div>

        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>Koordinat</label>
        <button className="btn" onClick={gunakanLokasiSaya} style={{ background: C.greenSoft, color: C.green, padding: "9px 14px", borderRadius: 10, fontSize: 13, marginBottom: 8 }}><Crosshair size={16} /> Gunakan lokasi saya sekarang</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 6 }}>
          <input className="field" style={inputStyle} placeholder="Lintang (lat)" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input className="field" style={inputStyle} placeholder="Bujur (lng)" value={lng} onChange={(e) => setLng(e.target.value)} />
        </div>
        {geoMsg && <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>{geoMsg}</div>}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
          <button className="btn" onClick={onClose} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave({ id: Date.now(), nama, catatan, gambar, lat: parseFloat(lat), lng: parseFloat(lng) })} style={{ background: canSave ? warna : C.border, color: "#fff", padding: "10px 20px", borderRadius: 11, cursor: canSave ? "pointer" : "not-allowed", fontWeight: 700 }}><Check size={16} /> Simpan</button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   LAPORAN PAGE — riwayat + kirim ke Telegram
   ============================================================ */
const JENIS_LAPORAN = ["Umum", "Absensi", "Jamaah Tersesat", "Kesehatan", "Kegiatan"];
const LAP_STATUS = {
  terkirim: { label: "Terkirim", color: C.green, bg: C.greenSoft, icon: CheckCircle2 },
  gagal: { label: "Gagal kirim", color: C.danger, bg: C.dangerSoft, icon: XCircle },
  lokal: { label: "Tersimpan", color: C.muted, bg: C.bg, icon: FileText },
  mengirim: { label: "Mengirim…", color: C.blue, bg: C.blueSoft, icon: RefreshCw },
};
const escHtml = (s) => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const waktuLapWIB = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
const waktuLapAST = (iso) => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Riyadh", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

function buildPesan(r) {
  return [
    `🕌 <b>KBIH Ibnu Aqil — Laporan</b>`,
    `━━━━━━━━━━━━━━`,
    `📋 Jenis: ${escHtml(r.jenis)}`,
    ``,
    `<b>${escHtml(r.judul)}</b>`,
    escHtml(r.isi),
    ``,
    `👤 Pencatat: <b>${escHtml(r.pencatat || "-")}</b>`,
    `🕐 ${waktuLapWIB(r.waktuISO)} WIB · ${waktuLapAST(r.waktuISO)} AST`,
  ].join("\n");
}
async function kirimTelegram(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token.trim()}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId.trim(), text, parse_mode: "HTML" }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || `HTTP ${res.status}`);
  return data;
}

function LaporanPage({ laporan, setLaporan, tg, setTg, agenda, list, absen, periodeAktif }) {
  const [mode, setMode] = useState("list");
  const [showConfig, setShowConfig] = useState(!(tg.token && tg.chatId));
  const [detail, setDetail] = useState(null);
  const terkonfigurasi = !!(tg.token && tg.chatId);

  const proses = async (data, kirim) => {
    const entry = { id: Date.now(), ...data, waktuISO: new Date().toISOString(), status: kirim ? "mengirim" : "lokal" };
    setLaporan((l) => [entry, ...l]);
    setMode("list");
    if (!kirim) return;
    try { await kirimTelegram(tg.token, tg.chatId, buildPesan(entry)); setLaporan((l) => l.map((x) => (x.id === entry.id ? { ...x, status: "terkirim" } : x))); }
    catch (e) { setLaporan((l) => l.map((x) => (x.id === entry.id ? { ...x, status: "gagal", error: e.message } : x))); }
  };
  const kirimUlang = async (r) => {
    setLaporan((l) => l.map((x) => (x.id === r.id ? { ...x, status: "mengirim" } : x)));
    try { await kirimTelegram(tg.token, tg.chatId, buildPesan(r)); setLaporan((l) => l.map((x) => (x.id === r.id ? { ...x, status: "terkirim", error: null } : x))); }
    catch (e) { setLaporan((l) => l.map((x) => (x.id === r.id ? { ...x, status: "gagal", error: e.message } : x))); }
  };
  const hapus = (id) => setLaporan((l) => l.filter((x) => x.id !== id));

  if (mode === "form")
    return <LaporanForm tg={tg} terkonfigurasi={terkonfigurasi} agenda={agenda} list={list} absen={absen} onCancel={() => setMode("list")} onSubmit={proses} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div><h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Laporan & Riwayat</h2><p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Catat laporan kegiatan dan kirim ke grup/channel Telegram lewat bot.</p></div>
        <button className="btn" onClick={() => setMode("form")} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Buat Laporan</button>
      </div>

      {/* KONFIG TELEGRAM */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 20, overflow: "hidden" }}>
        <button className="btn" onClick={() => setShowConfig((s) => !s)} style={{ width: "100%", justifyContent: "space-between", background: "transparent", padding: "14px 16px", borderRadius: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Send size={17} color={terkonfigurasi ? C.green : C.muted} />
            <span style={{ fontWeight: 700 }}>Koneksi Telegram Bot</span>
            <Badge bg={terkonfigurasi ? C.greenSoft : C.bg} color={terkonfigurasi ? C.green : C.muted}>{terkonfigurasi ? "Terkonfigurasi" : "Belum diatur"}</Badge>
          </span>
          <ChevronRight size={18} color={C.muted} style={{ transform: showConfig ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </button>
        {showConfig && <TelegramConfig tg={tg} setTg={setTg} />}
      </div>

      {/* RIWAYAT */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em", color: C.ink }}><Clock size={16} /> Riwayat Laporan ({laporan.length})</div>
      {laporan.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}><FileText size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada laporan.</p></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {laporan.map((r) => {
            const st = LAP_STATUS[r.status] || LAP_STATUS.lokal;
            return (
              <div key={r.id} className="card-hover" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
                      <Badge bg={C.greenSoft} color={C.green}>{r.jenis}</Badge>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>
                        <st.icon size={12} className={r.status === "mengirim" ? "spin" : ""} /> {st.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{r.judul}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginTop: 3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.isi}</div>
                    <div style={{ display: "flex", gap: 14, marginTop: 9, fontSize: 12, color: C.muted, flexWrap: "wrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><User size={13} /> {r.pencatat || "—"}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Clock size={13} /> {waktuLapWIB(r.waktuISO)} WIB</span>
                    </div>
                    {r.status === "gagal" && r.error && <div style={{ fontSize: 11.5, color: C.danger, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}><AlertTriangle size={12} /> {r.error}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                    <button className="btn iconbtn" onClick={() => setDetail(r)} title="Lihat" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Eye size={15} /></button>
                    {(r.status === "gagal" || r.status === "lokal") && (
                      <button className="btn" onClick={() => kirimUlang(r)} disabled={!terkonfigurasi} title={terkonfigurasi ? "" : "Atur koneksi Telegram dulu"} style={{ background: terkonfigurasi ? C.green : C.border, color: "#fff", padding: "7px 11px", borderRadius: 9, fontSize: 12 }}><Send size={13} /> Kirim</button>
                    )}
                    <button className="btn iconbtn" onClick={() => hapus(r.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {detail && (
        <Modal onClose={() => setDetail(null)} width={480}>
          <div style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div><Badge bg={C.greenSoft} color={C.green}>{detail.jenis}</Badge><h3 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 700 }}>{detail.judul}</h3></div>
              <button className="btn iconbtn" onClick={() => setDetail(null)} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", color: C.ink, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "14px 0", margin: "6px 0 14px" }}>{detail.isi}</div>
            <div style={{ fontSize: 13, color: C.muted, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><User size={14} /> Pencatat: <strong style={{ color: C.ink }}>{detail.pencatat || "—"}</strong></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Clock size={14} /> {waktuLapWIB(detail.waktuISO)} WIB · {waktuLapAST(detail.waktuISO)} AST</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TelegramConfig({ tg, setTg }) {
  const [f, setF] = useState(tg);
  useEffect(() => { setF((s) => (s.token || s.chatId ? s : tg)); }, [tg]);
  const [testMsg, setTestMsg] = useState("");
  const [testing, setTesting] = useState(false);
  const [ubahToken, setUbahToken] = useState(false);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const simpan = () => { setTg(f); setUbahToken(false); setTestMsg("Konfigurasi tersimpan untuk sesi ini."); };
  const tes = async () => {
    if (!f.token || !f.chatId) { setTestMsg("Bot Token dan Chat ID belum lengkap."); return; }
    setTg(f); setTesting(true); setTestMsg("Mengirim pesan tes…");
    try { await kirimTelegram(f.token, f.chatId, "✅ <b>Tes koneksi KBIH Ibnu Aqil</b>\nBot berhasil terhubung."); setTestMsg("Berhasil! Cek Telegram Anda — pesan tes sudah masuk."); }
    catch (e) { setTestMsg("Gagal: " + e.message); }
    setTesting(false);
  };

  return (
    <div style={{ padding: "4px 16px 18px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", margin: "14px 0", fontSize: 12.5, color: C.muted, display: "flex", gap: 8 }}>
        <ShieldAlert size={26} color={C.gold} style={{ flexShrink: 0 }} />
        <span>Token tidak ditulis di dalam kode aplikasi. Pengaturan ini tersimpan di server dan hanya bisa dibaca pembimbing yang sudah login — cukup diisi <strong>sekali</strong>, lalu berlaku untuk semua pembimbing. Cara membuat bot: chat <strong>@BotFather</strong> → <strong>/newbot</strong>.</span>
      </div>

      {/* token tersembunyi */}
      <Label>Bot Token</Label>
      {!ubahToken ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 13px", border: `1px solid ${C.border}`, borderRadius: 11, background: C.bg, marginBottom: 12 }}>
          <ShieldAlert size={17} color={f.token ? C.green : C.muted} />
          <span style={{ flex: 1, fontSize: 13, color: f.token ? C.ink : C.muted, letterSpacing: ".08em" }}>
            {f.token ? "••••••••••••••••••••••  (tersembunyi)" : "Belum diisi"}
          </span>
          <button className="btn" onClick={() => setUbahToken(true)} style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.muted, padding: "6px 12px", borderRadius: 9, fontSize: 12 }}><Pencil size={13} /> Ubah</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input className="field" type="password" autoFocus style={{ ...inputStyle, flex: 1 }} value={f.token} onChange={(e) => set("token", e.target.value)} placeholder="123456789:AA..." />
          <button className="btn" onClick={() => { setF((s) => ({ ...s, token: tg.token })); setUbahToken(false); }} style={{ background: C.bg, color: C.muted, padding: "0 14px", borderRadius: 11 }}>Batal</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div><Label>Chat ID (grup / channel)</Label><input className="field" style={inputStyle} value={f.chatId} onChange={(e) => set("chatId", e.target.value)} placeholder="cth. -1001234567890" /></div>
        <div><Label>Nama pencatat / petugas</Label><input className="field" style={inputStyle} value={f.pencatat} onChange={(e) => set("pencatat", e.target.value)} placeholder="cth. Ustadz Fulan" /></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn" onClick={simpan} style={{ background: C.greenSoft, color: C.green, padding: "9px 16px", borderRadius: 11 }}><Check size={16} /> Simpan</button>
        <button className="btn" onClick={tes} disabled={testing} style={{ background: C.green, color: "#fff", padding: "9px 16px", borderRadius: 11 }}>{testing ? <RefreshCw size={16} className="spin" /> : <Send size={16} />} Kirim tes</button>
        {testMsg && <span style={{ fontSize: 12.5, color: /gagal/i.test(testMsg) ? C.danger : C.muted }}>{testMsg}</span>}
      </div>
    </div>
  );
}

function LaporanForm({ tg, terkonfigurasi, agenda, list, absen, onCancel, onSubmit }) {
  const [f, setF] = useState({ jenis: "Umum", judul: "", isi: "", pencatat: tg.pencatat || "" });
  useEffect(() => { setF((s) => (s.pencatat ? s : { ...s, pencatat: tg.pencatat || "" })); }, [tg.pencatat]);
  const [agSel, setAgSel] = useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim() && f.isi.trim() && f.pencatat.trim();

  const sisip = (teks) => setF((s) => ({ ...s, isi: s.isi ? s.isi + "\n\n" + teks : teks }));
  const genRingkasan = () => { const lansia = list.filter((j) => (hitungUsia(j.tanggalLahir) ?? 0) >= 60).length; const kr = list.filter((j) => j.kursiRoda).length; sisip(`Ringkasan jamaah:\n- Total jamaah: ${list.length}\n- Lansia (60+): ${lansia}\n- Pengguna kursi roda: ${kr}`); };
  const genKondisi = () => {
    const hariIni = new Date().toISOString().slice(0, 10);
    const baris = [];
    list.forEach((j) => {
      const hari = (j.catatanHarian || []).filter((c) => c.tanggal === hariIni);
      if (!hari.length) return;
      const t = hari.sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""))[0];
      const k = KONDISI[t.kondisi]?.label || "-";
      const rinci = [t.isi, t.suhu && `suhu ${t.suhu}`, t.tensi && `tensi ${t.tensi}`, t.obat && `obat: ${t.obat}`].filter(Boolean).join(" — ");
      baris.push(`- ${j.nama} [${k}]${rinci ? `: ${rinci}` : ""}`);
    });
    if (!baris.length) return sisip("Belum ada catatan kondisi jamaah untuk hari ini.");
    const perluPerhatian = list.filter((j) => {
      const t = catatanTerakhir(j);
      return t && (t.kondisi === "sakit" || t.kondisi === "perhatian");
    }).length;
    sisip([`Kondisi jamaah hari ini (${baris.length} tercatat, ${perluPerhatian} perlu perhatian):`, ...baris].join("\n"));
  };

  const genAbsensi = () => { const ag = agenda.find((a) => a.id === Number(agSel)); if (!ag) return; const rec = absen[ag.id] || {}; const grp = (st) => list.filter((j) => rec[j.id] === st).map((j) => j.nama); const h = grp("hadir"), iz = grp("izin"), t = grp("tidak"); sisip([`Absensi — ${ag.judul} (${tglRingkas(ag.tanggal)} ${ag.waktu || ""}):`, `Hadir (${h.length}): ${h.join(", ") || "-"}`, `Izin (${iz.length}): ${iz.join(", ") || "-"}`, `Tidak hadir (${t.length}): ${t.join(", ") || "-"}`].join("\n")); };

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>Buat Laporan</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><Label>Jenis laporan</Label><select className="field" style={inputStyle} value={f.jenis} onChange={(e) => set("jenis", e.target.value)}>{JENIS_LAPORAN.map((j) => <option key={j}>{j}</option>)}</select></div>
          <div><Label>Pencatat</Label><input className="field" style={inputStyle} value={f.pencatat} onChange={(e) => set("pencatat", e.target.value)} placeholder="Nama Anda / petugas" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Judul laporan</Label><input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Kondisi jamaah sore ini" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Isi laporan</Label>
            <textarea className="field" rows={6} style={{ ...inputStyle, resize: "vertical" }} value={f.isi} onChange={(e) => set("isi", e.target.value)} placeholder="Tulis laporan di sini…" />
          </div>
        </div>

        <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginTop: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Sisipkan data otomatis:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn" onClick={genRingkasan} style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.ink, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}><Users size={14} /> Ringkasan jamaah</button>
            <button className="btn" onClick={genKondisi} style={{ background: "#fff", border: `1px solid ${C.border}`, color: C.ink, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}><HeartPulse size={14} /> Kondisi jamaah hari ini</button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <select className="field" style={{ ...inputStyle, padding: "7px 10px", width: "auto" }} value={agSel} onChange={(e) => setAgSel(e.target.value)}>
                <option value="">— pilih agenda —</option>
                {agenda.map((a) => <option key={a.id} value={a.id}>{a.judul}</option>)}
              </select>
              <button className="btn" onClick={genAbsensi} disabled={!agSel} style={{ background: agSel ? "#fff" : C.bg, border: `1px solid ${C.border}`, color: agSel ? C.ink : C.border, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}><ClipboardCheck size={14} /> Rekap absensi</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn" disabled={!canSave} onClick={() => onSubmit(f, false)} style={{ background: "#fff", color: canSave ? C.green : C.border, border: `1px solid ${canSave ? C.green : C.border}`, padding: "11px 18px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><FileText size={17} /> Simpan saja</button>
            <button className="btn" disabled={!canSave || !terkonfigurasi} title={terkonfigurasi ? "" : "Atur koneksi Telegram dulu"} onClick={() => onSubmit(f, true)} style={{ background: canSave && terkonfigurasi ? C.green : C.border, color: "#fff", padding: "11px 22px", borderRadius: 12, cursor: canSave && terkonfigurasi ? "pointer" : "not-allowed" }}><Send size={17} /> Kirim ke Telegram</button>
          </div>
        </div>
        {!terkonfigurasi && <div style={{ fontSize: 12, color: C.muted, marginTop: 10, textAlign: "right" }}>Atur koneksi Telegram di halaman ini untuk mengaktifkan pengiriman.</div>}
      </div>
    </div>
  );
}

/* ============================================================
   DOA PAGE — kumpulan doa, tulis & unggah, dengan pencarian
   ============================================================ */
function DoaPage({ doa, setDoa, kategori, setKategori, bolehKelola = true }) {
  const [mode, setMode] = useState("list");
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");
  const [kelola, setKelola] = useState(false);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return doa.filter((d) => {
      if (kat !== "Semua" && d.kategori !== kat) return false;
      if (!s) return true;
      return [d.judul, d.kategori, d.latin, d.arti, d.catatan, d.arab].join(" ").toLowerCase().includes(s);
    });
  }, [doa, q, kat]);

  const simpan = (d) => {
    if (d.id) setDoa((l) => l.map((x) => (x.id === d.id ? d : x)));
    else setDoa((l) => [...l, { ...d, id: Date.now() }]);
    setMode("list");
  };
  const hapus = (id) => { if (window.confirm("Hapus doa ini?")) setDoa((l) => l.filter((x) => x.id !== id)); };

  if (mode === "form") return <DoaForm initial={editing} kategoriAda={kategori} onCancel={() => setMode("list")} onSave={simpan} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div><h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Kumpulan Doa</h2><p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Panduan doa & bacaan manasik untuk pembimbing dan jamaah.</p></div>
        <button className="btn" onClick={() => { setEditing(null); setMode("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}><Plus size={18} /> Tambah Doa</button>
      </div>

      <FilterKategori q={q} setQ={setQ} kat={kat} setKat={setKat} kategori={kategori}
        onKelola={() => setKelola(true)} jumlah={hasil.length} total={doa.length} bolehKelola={bolehKelola}
        placeholder="Cari doa — judul, bacaan latin, arti, atau catatan…" />

      {hasil.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <BookOpen size={32} color={C.border} /><p style={{ marginTop: 12, fontWeight: 600 }}>Tidak ada doa yang cocok.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Coba kata kunci lain atau ubah kategori.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {hasil.map((d) => (
            <div key={d.id} className="kartu-pad" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <div>
                  {d.kategori && <Badge bg={C.goldSoft} color={C.goldDeep} icon={BookOpen}>{d.kategori}</Badge>}
                  <div style={{ fontSize: 16.5, fontWeight: 700, marginTop: 7 }}>{d.judul}</div>
                </div>
                {bolehKelola && (
                  <div style={{ display: "flex", gap: 6, height: "fit-content" }}>
                    <button className="btn iconbtn" onClick={() => { setEditing(d); setMode("form"); }} title="Ubah" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={15} /></button>
                    <button className="btn iconbtn" onClick={() => hapus(d.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                  </div>
                )}
              </div>

              {d.arab && (
                <div dir="rtl" lang="ar" className="arab" style={{ fontSize: 34, color: C.ink, background: C.greenSoft, borderRadius: 12, padding: "18px 18px 14px", marginBottom: 10 }}>
                  {d.arab}
                </div>
              )}
              {d.latin && <div style={{ fontSize: 14, fontStyle: "italic", color: C.green, marginBottom: 7, lineHeight: 1.6 }}>{d.latin}</div>}
              {d.arti && <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6 }}>"{d.arti}"</div>}
              {d.catatan && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 9, display: "flex", gap: 6, alignItems: "flex-start" }}><StickyNote size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {d.catatan}</div>}
              {d.berkas && (
                <button className="btn" onClick={() => bukaBerkas(d.berkas)} style={{ marginTop: 12, background: C.dangerSoft, color: C.danger, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                  <Paperclip size={14} /> {d.berkas.nama}{d.berkas.ukuran ? <span style={{ fontWeight: 500, opacity: .8 }}> ({formatUkuran(d.berkas.ukuran)})</span> : null}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {kelola && (
        <KelolaKategoriModal kategori={kategori} setKategori={setKategori} items={doa} setItems={setDoa}
          judul="Kumpulan Doa" onClose={() => { setKelola(false); setKat("Semua"); }} />
      )}
    </div>
  );
}

function DoaForm({ initial, kategoriAda, onCancel, onSave }) {
  const [f, setF] = useState(initial || { kategori: "", judul: "", arab: "", latin: "", arti: "", catatan: "", berkas: null });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Doa" : "Tambah Doa"}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <Label>Kategori</Label>
            <select className="field" style={inputStyle} value={f.kategori} onChange={(e) => set("kategori", e.target.value)}>
              <option value="">— tanpa kategori —</option>
              {kategoriAda.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div><Label req>Judul doa</Label><input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Doa Masuk Masjid" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Teks Arab</Label>
            <textarea className="field arab" dir="rtl" lang="ar" rows={3} style={{ ...inputStyle, resize: "vertical", fontSize: 28 }} value={f.arab} onChange={(e) => set("arab", e.target.value)} placeholder="اللَّهُمَّ ..." />
          </div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Bacaan latin</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.latin} onChange={(e) => set("latin", e.target.value)} placeholder="Allahumma…" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Arti / terjemahan</Label><textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.arti} onChange={(e) => set("arti", e.target.value)} placeholder="Ya Allah…" /></div>
          <div style={{ gridColumn: "1 / -1" }}><Label>Catatan pembimbing</Label><input className="field" style={inputStyle} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. Dibaca saat memasuki Masjidil Haram" /></div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Lampiran (tautan, opsional)</Label>
            <TautanBerkas nilai={f.berkas} onChange={(v) => set("berkas", v)} label="Tambah tautan lampiran" petunjuk="Bisa tautan lembar doa PDF, foto, atau rekaman audio dari Google Drive." />
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Bisa untuk lembar doa PDF, foto tulisan tangan, atau rekaman audio bacaan.</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PEMASANGAN APLIKASI DI HP (PWA)
   ============================================================ */
function usePemasangan() {
  const [aba, setAba] = useState(null);
  const [terpasang, setTerpasang] = useState(false);

  useEffect(() => {
    const tangkap = (e) => { e.preventDefault(); setAba(e); };
    const sudah = () => { setTerpasang(true); setAba(null); };
    window.addEventListener("beforeinstallprompt", tangkap);
    window.addEventListener("appinstalled", sudah);
    if (window.matchMedia?.("(display-mode: standalone)").matches) setTerpasang(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", tangkap);
      window.removeEventListener("appinstalled", sudah);
    };
  }, []);

  const pasang = async () => {
    if (!aba) return;
    aba.prompt();
    try { await aba.userChoice; } catch { /* abaikan */ }
    setAba(null);
  };

  return { bisa: !!aba && !terpasang, terpasang, pasang };
}

function TanpaPeriode({ onBuka }) {
  return (
    <div className="fade" style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "48px 22px", textAlign: "center" }}>
      <LayoutGrid size={34} color={C.border} />
      <p style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 15.5 }}>Belum ada periode aktif</p>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: C.muted }}>Buat periode haji atau umroh terlebih dahulu untuk mulai mengelola data jamaah.</p>
      <button className="btn" onClick={onBuka} style={{ background: C.green, color: "#fff", padding: "11px 20px", borderRadius: 12 }}>
        <LayoutGrid size={17} /> Buka Halaman Periode
      </button>
    </div>
  );
}

/* ============================================================
   PERIODE PAGE — beranda pemilihan periode haji/umroh
   ============================================================ */
function PeriodePage({ periode, setPeriode, idAktif, onPilih, siap, bolehKelola = true }) {
  const [form, setForm] = useState(null);   // null | {} | data
  const [hapus, setHapus] = useState(null);

  const urut = [...periode].sort((a, b) => (b.berangkat || "").localeCompare(a.berangkat || ""));

  const simpan = (d) => {
    if (d.id) setPeriode((l) => l.map((x) => (x.id === d.id ? d : x)));
    else setPeriode((l) => [...l, { ...d, id: Date.now(), dibuat: new Date().toISOString() }]);
    setForm(null);
  };

  if (form !== null) return <PeriodeForm initial={form.id ? form : null} onCancel={() => setForm(null)} onSave={simpan} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Periode Haji & Umroh</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Pilih periode untuk mengelola jamaah, agenda, kursi, dan laporannya.</p>
        </div>
        {bolehKelola && (
          <button className="btn" onClick={() => setForm({})} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
            <Plus size={18} /> Tambah Periode
          </button>
        )}
      </div>

      <div style={{ background: C.goldSoft, border: `1px solid ${C.gold}44`, borderRadius: 13, padding: "11px 14px", margin: "16px 0 20px", fontSize: 12.5, color: C.goldDeep, display: "flex", gap: 8, alignItems: "flex-start" }}>
        <BookOpen size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>Data jamaah, kursi bis, agenda, absensi, lokasi, dan laporan <strong>terpisah untuk tiap periode</strong>. Kumpulan Doa dan Hukum Fiqh dipakai bersama oleh semua periode.</span>
      </div>

      {!siap ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted, fontSize: 13 }}>
          <Loader2 size={20} className="spin" color={C.green} /><div style={{ marginTop: 8 }}>Memuat periode…</div>
        </div>
      ) : urut.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <LayoutGrid size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada periode.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Tekan "Tambah Periode" untuk memulai.</p>
        </div>
      ) : (
        <div className="kartu-grid">
          {urut.map((p) => {
            const aktif = String(p.id) === String(idAktif);
            const haji = p.jenis === "Haji";
            return (
              <div key={p.id} className="card-hover"
                style={{ background: C.surface, borderRadius: 18, padding: 17, border: `2px solid ${aktif ? C.green : C.border}`, position: "relative" }}>
                {aktif && (
                  <span style={{ position: "absolute", top: -10, left: 16, background: C.green, color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "3px 10px", borderRadius: 99, letterSpacing: ".04em" }}>
                    SEDANG DIBUKA
                  </span>
                )}
                <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 9, marginTop: aktif ? 5 : 0 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: haji ? C.goldSoft : C.greenSoft, color: haji ? C.goldDeep : C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Moon size={19} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.3 }}>{p.nama}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{p.jenis} · {p.tahun || "—"}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                  {p.berangkat && <Badge bg={C.greenSoft} color={C.green} icon={CalendarDays}>Berangkat {tglRingkas(p.berangkat)}</Badge>}
                  {p.pulang && <Badge bg={C.bg} color={C.muted} icon={CalendarDays}>Pulang {tglRingkas(p.pulang)}</Badge>}
                </div>
                {p.catatan && <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.5, marginBottom: 12 }}>{p.catatan}</div>}

                <div style={{ display: "flex", gap: 7, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                  <button className="btn" onClick={() => onPilih(p.id)}
                    style={{ flex: 1, justifyContent: "center", background: aktif ? C.greenSoft : C.green, color: aktif ? C.green : "#fff", padding: "9px 12px", borderRadius: 10, fontSize: 13 }}>
                    {aktif ? <><Check size={15} /> Lanjutkan</> : <><ChevronRight size={15} /> Buka</>}
                  </button>
                  {bolehKelola && <>
                    <button className="btn iconbtn" onClick={() => setForm(p)} title="Ubah" style={{ background: C.bg, padding: 9, borderRadius: 10 }}><Pencil size={15} /></button>
                    <button className="btn iconbtn" onClick={() => setHapus(p)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 9, borderRadius: 10 }}><Trash2 size={15} /></button>
                  </>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {hapus && (
        <HapusPeriodeModal p={hapus} onClose={() => setHapus(null)}
          onSelesai={() => { setPeriode((l) => l.filter((x) => x.id !== hapus.id)); setHapus(null); }} />
      )}
    </div>
  );
}

function PeriodeForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial || { nama: "", jenis: "Umroh", tahun: String(new Date().getFullYear()), berangkat: "", pulang: "", catatan: "" });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.nama.trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 620, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Periode" : "Tambah Periode"}</h2>
        <Grid>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label req>Nama periode</Label>
            <input className="field" style={inputStyle} value={f.nama} onChange={(e) => set("nama", e.target.value)} placeholder="cth. Umroh Reguler Agustus" />
          </div>
          <div>
            <Label>Jenis</Label>
            <select className="field" style={inputStyle} value={f.jenis} onChange={(e) => set("jenis", e.target.value)}>
              <option>Umroh</option><option>Haji</option>
            </select>
          </div>
          <div>
            <Label>Tahun</Label>
            <input className="field" style={inputStyle} value={f.tahun} onChange={(e) => set("tahun", e.target.value)} placeholder="cth. 2026" />
          </div>
          <div>
            <Label>Tanggal berangkat</Label>
            <input className="field" type="date" style={inputStyle} value={f.berangkat} onChange={(e) => set("berangkat", e.target.value)} />
          </div>
          <div>
            <Label>Tanggal pulang</Label>
            <input className="field" type="date" style={inputStyle} value={f.pulang} onChange={(e) => set("pulang", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Catatan</Label>
            <textarea className="field" rows={2} style={{ ...inputStyle, resize: "vertical" }} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. Rombongan A & B, 2 pembimbing" />
          </div>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

function HapusPeriodeModal({ p, onClose, onSelesai }) {
  const [isi, setIsi] = useState(null);
  const [ketikan, setKetikan] = useState("");
  const [sibuk, setSibuk] = useState(false);

  useEffect(() => { hitungIsiPeriode(p.id).then(setIsi).catch(() => setIsi({})); }, [p.id]);

  const cocok = ketikan.trim().toLowerCase() === "hapus";
  const jalankan = async () => {
    setSibuk(true);
    try { await hapusPeriodeLengkap(p.id); onSelesai(); }
    catch (e) { alert("Gagal menghapus: " + pesanGalat(e)); setSibuk(false); }
  };

  return (
    <Modal onClose={sibuk ? () => {} : onClose} width={430}>
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: C.dangerSoft, color: C.danger, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <AlertOctagon size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.danger }}>Hapus Periode Ini?</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: C.muted }}>Tindakan ini <strong>tidak dapat dibatalkan</strong>.</p>
          </div>
        </div>

        <div style={{ background: C.bg, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{p.nama}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 9 }}>Seluruh data di bawah ini akan ikut terhapus permanen:</div>
          {isi === null ? (
            <div style={{ fontSize: 12.5, color: C.muted, display: "flex", gap: 7, alignItems: "center" }}><Loader2 size={14} className="spin" /> Menghitung isi…</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Users size={14} color={C.danger} /> {isi.jamaah || 0} data jamaah</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><CalendarDays size={14} color={C.danger} /> {isi.agenda || 0} agenda</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><FileText size={14} color={C.danger} /> {isi.laporan || 0} laporan</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Bus size={14} color={C.danger} /> denah kursi, absensi, dan titik lokasi</span>
            </div>
          )}
        </div>

        <div style={{ background: C.greenSoft, borderRadius: 10, padding: "9px 12px", fontSize: 12, color: C.green, marginBottom: 14 }}>
          Kumpulan Doa dan Hukum Fiqh <strong>tidak</strong> terhapus — keduanya dipakai bersama semua periode.
        </div>

        <Label>Ketik <strong>HAPUS</strong> untuk menegaskan</Label>
        <input className="field" style={{ ...inputStyle, marginBottom: 16 }} value={ketikan} onChange={(e) => setKetikan(e.target.value)} placeholder="HAPUS" autoFocus />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn" onClick={onClose} disabled={sibuk} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" onClick={jalankan} disabled={!cocok || sibuk}
            style={{ background: cocok && !sibuk ? C.danger : C.border, color: "#fff", padding: "10px 20px", borderRadius: 11, cursor: cocok && !sibuk ? "pointer" : "not-allowed" }}>
            {sibuk ? <Loader2 size={16} className="spin" /> : <Trash2 size={16} />} {sibuk ? "Menghapus…" : "Hapus Permanen"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   PENGELOLA KATEGORI (dipakai halaman Doa & Fiqh)
   ============================================================ */
function KelolaKategoriModal({ kategori, setKategori, items, setItems, judul, onClose }) {
  const [baru, setBaru] = useState("");
  const [ubahIdx, setUbahIdx] = useState(null);
  const [ubahTeks, setUbahTeks] = useState("");

  const jumlahDipakai = (nama) => items.filter((x) => x.kategori === nama).length;

  const tambah = () => {
    const n = baru.trim();
    if (!n) return;
    if (kategori.some((k) => k.toLowerCase() === n.toLowerCase())) return alert("Kategori itu sudah ada.");
    setKategori([...kategori, n]);
    setBaru("");
  };

  const simpanUbah = (i) => {
    const n = ubahTeks.trim();
    if (!n) return;
    const lama = kategori[i];
    if (n === lama) { setUbahIdx(null); return; }
    if (kategori.some((k, j) => j !== i && k.toLowerCase() === n.toLowerCase())) return alert("Kategori itu sudah ada.");
    setKategori(kategori.map((k, j) => (j === i ? n : k)));
    // Ikut memperbarui semua isi yang memakai kategori lama
    setItems((l) => l.map((x) => (x.kategori === lama ? { ...x, kategori: n } : x)));
    setUbahIdx(null);
  };

  const hapus = (i) => {
    const nama = kategori[i];
    const dipakai = jumlahDipakai(nama);
    const pesan = dipakai
      ? `Hapus kategori "${nama}"?\n\n${dipakai} isi yang memakai kategori ini tidak ikut terhapus, tetapi kategorinya akan dikosongkan.`
      : `Hapus kategori "${nama}"?`;
    if (!window.confirm(pesan)) return;
    setKategori(kategori.filter((_, j) => j !== i));
    if (dipakai) setItems((l) => l.map((x) => (x.kategori === nama ? { ...x, kategori: "" } : x)));
  };

  const geser = (i, arah) => {
    const j = i + arah;
    if (j < 0 || j >= kategori.length) return;
    const salin = [...kategori];
    [salin[i], salin[j]] = [salin[j], salin[i]];
    setKategori(salin);
  };

  return (
    <Modal onClose={onClose} width={430}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}><Tags size={18} color={C.green} /> Kelola Kategori</h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 12.5, color: C.muted }}>Kategori untuk {judul}. Mengubah nama kategori otomatis memperbarui semua isinya.</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input className="field" style={{ ...inputStyle, flex: 1 }} value={baru} onChange={(e) => setBaru(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tambah()} placeholder="Nama kategori baru…" />
          <button className="btn" onClick={tambah} style={{ background: C.green, color: "#fff", padding: "0 15px", borderRadius: 11 }}><Plus size={17} /></button>
        </div>

        <div style={{ maxHeight: 320, overflow: "auto" }} className="kbih-scroll">
          {kategori.length === 0 ? (
            <div style={{ fontSize: 13, color: C.muted, textAlign: "center", padding: 20 }}>Belum ada kategori.</div>
          ) : kategori.map((k, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", border: `1px solid ${C.border}`, borderRadius: 11, marginBottom: 8, background: "#fff" }}>
              {ubahIdx === i ? (
                <>
                  <input className="field" autoFocus style={{ ...inputStyle, flex: 1, padding: "7px 10px" }} value={ubahTeks}
                    onChange={(e) => setUbahTeks(e.target.value)} onKeyDown={(e) => e.key === "Enter" && simpanUbah(i)} />
                  <button className="btn" onClick={() => simpanUbah(i)} style={{ background: C.green, color: "#fff", padding: "7px 10px", borderRadius: 9 }}><Check size={14} /></button>
                  <button className="btn" onClick={() => setUbahIdx(null)} style={{ background: C.bg, color: C.muted, padding: "7px 10px", borderRadius: 9 }}><X size={14} /></button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <button className="btn iconbtn" onClick={() => geser(i, -1)} disabled={i === 0} title="Naik"
                      style={{ background: "transparent", color: i === 0 ? C.border : C.muted, padding: 1, borderRadius: 5 }}><ChevronRight size={13} style={{ transform: "rotate(-90deg)" }} /></button>
                    <button className="btn iconbtn" onClick={() => geser(i, 1)} disabled={i === kategori.length - 1} title="Turun"
                      style={{ background: "transparent", color: i === kategori.length - 1 ? C.border : C.muted, padding: 1, borderRadius: 5 }}><ChevronRight size={13} style={{ transform: "rotate(90deg)" }} /></button>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{k}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{jumlahDipakai(k)} isi</div>
                  </div>
                  <button className="btn iconbtn" onClick={() => { setUbahIdx(i); setUbahTeks(k); }} title="Ubah nama"
                    style={{ background: C.bg, padding: 7, borderRadius: 9 }}><Pencil size={14} /></button>
                  <button className="btn iconbtn" onClick={() => hapus(i)} title="Hapus"
                    style={{ background: C.dangerSoft, color: C.danger, padding: 7, borderRadius: 9 }}><Trash2 size={14} /></button>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button className="btn" onClick={onClose} style={{ background: C.green, color: "#fff", padding: "10px 20px", borderRadius: 11 }}>Selesai</button>
        </div>
      </div>
    </Modal>
  );
}

/* Baris filter kategori + pencarian, dipakai Doa & Fiqh */
function FilterKategori({ q, setQ, kat, setKat, kategori, onKelola, placeholder, jumlah, total, bolehKelola = true }) {
  return (
    <>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 14, marginBottom: 14 }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <Search size={17} color={C.muted} style={{ position: "absolute", left: 13, top: 12 }} />
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, paddingLeft: 40 }} />
          {q && <button className="btn iconbtn" onClick={() => setQ("")} style={{ position: "absolute", right: 8, top: 8, background: C.bg, padding: 6, borderRadius: 8 }}><X size={14} /></button>}
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
          {["Semua", ...kategori].map((k) => {
            const on = kat === k;
            return <button key={k} className="btn" onClick={() => setKat(k)}
              style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.muted, padding: "6px 13px", borderRadius: 99, fontSize: 12.5, border: `1px solid ${on ? C.green : C.border}` }}>{k}</button>;
          })}
          {bolehKelola && (
            <button className="btn" onClick={onKelola} title="Kelola kategori"
              style={{ background: "#fff", color: C.green, border: `1px dashed ${C.green}66`, padding: "6px 12px", borderRadius: 99, fontSize: 12.5 }}>
              <Tags size={14} /> Kelola
            </button>
          )}
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 10 }}>Menampilkan {jumlah} dari {total}.</div>
    </>
  );
}

/* ============================================================
   FIQH PAGE — kumpulan hukum fiqh manasik
   ============================================================ */
function FiqhPage({ fiqh, setFiqh, kategori, setKategori, bolehKelola = true }) {
  const [mode, setMode] = useState("list");
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");
  const [kelola, setKelola] = useState(false);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return fiqh.filter((d) => {
      if (kat !== "Semua" && d.kategori !== kat) return false;
      if (!s) return true;
      return [d.judul, d.kategori, d.isi, d.dalil, d.rujukan, d.catatan].join(" ").toLowerCase().includes(s);
    });
  }, [fiqh, q, kat]);

  const simpan = (d) => {
    if (d.id) setFiqh((l) => l.map((x) => (x.id === d.id ? d : x)));
    else setFiqh((l) => [...l, { ...d, id: Date.now() }]);
    setMode("list");
  };
  const hapus = (id) => { if (window.confirm("Hapus catatan fiqh ini?")) setFiqh((l) => l.filter((x) => x.id !== id)); };

  if (mode === "form") return <FiqhForm initial={editing} kategori={kategori} onCancel={() => setMode("list")} onSave={simpan} />;

  return (
    <div className="fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Hukum Fiqh</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Rujukan hukum manasik untuk menjawab pertanyaan jamaah di lapangan.</p>
        </div>
        {bolehKelola && (
          <button className="btn" onClick={() => { setEditing(null); setMode("form"); }} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
            <Plus size={18} /> Tambah Catatan
          </button>
        )}
      </div>

      <FilterKategori q={q} setQ={setQ} kat={kat} setKat={setKat} kategori={kategori}
        onKelola={() => setKelola(true)} jumlah={hasil.length} total={fiqh.length} bolehKelola={bolehKelola}
        placeholder="Cari hukum — judul, uraian, dalil, atau rujukan…" />

      {hasil.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <Scale size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Tidak ada catatan yang cocok.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Coba kata kunci lain atau ubah kategori.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {hasil.map((d) => (
            <div key={d.id} className="kartu-pad" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  {d.kategori && <Badge bg={C.goldSoft} color={C.goldDeep} icon={Scale}>{d.kategori}</Badge>}
                  <div style={{ fontSize: 16.5, fontWeight: 700, marginTop: 7 }}>{d.judul}</div>
                </div>
                {bolehKelola && (
                  <div style={{ display: "flex", gap: 6, height: "fit-content" }}>
                    <button className="btn iconbtn" onClick={() => { setEditing(d); setMode("form"); }} title="Ubah" style={{ background: C.bg, padding: 8, borderRadius: 9 }}><Pencil size={15} /></button>
                    <button className="btn iconbtn" onClick={() => hapus(d.id)} title="Hapus" style={{ background: C.dangerSoft, color: C.danger, padding: 8, borderRadius: 9 }}><Trash2 size={15} /></button>
                  </div>
                )}
              </div>

              {d.isi && <div style={{ fontSize: 14.5, lineHeight: 1.7, color: C.ink, whiteSpace: "pre-wrap" }}>{d.isi}</div>}

              {d.dalil && (
                <div style={{ background: C.greenSoft, borderRadius: 11, padding: "11px 13px", marginTop: 12, fontSize: 13.5, color: C.green, lineHeight: 1.6 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 4, opacity: .8 }}>Dalil</div>
                  {d.dalil}
                </div>
              )}
              {d.rujukan && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 9, display: "flex", gap: 6, alignItems: "center" }}><BookOpen size={14} /> {d.rujukan}</div>}
              {d.catatan && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 6, display: "flex", gap: 6, alignItems: "flex-start" }}><StickyNote size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {d.catatan}</div>}
              {d.berkas && (
                <button className="btn" onClick={() => bukaBerkas(d.berkas)} style={{ marginTop: 12, background: C.dangerSoft, color: C.danger, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                  <Paperclip size={14} /> {d.berkas.nama}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {kelola && (
        <KelolaKategoriModal kategori={kategori} setKategori={setKategori} items={fiqh} setItems={setFiqh}
          judul="Hukum Fiqh" onClose={() => { setKelola(false); setKat("Semua"); }} />
      )}
    </div>
  );
}

function FiqhForm({ initial, kategori, onCancel, onSave }) {
  const [f, setF] = useState(initial || { kategori: "", judul: "", isi: "", dalil: "", rujukan: "", catatan: "", berkas: null });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const canSave = f.judul.trim().length > 0;

  return (
    <div className="fade">
      <button className="btn" onClick={onCancel} style={{ background: "transparent", color: C.green, padding: "6px 0", marginBottom: 14 }}><ArrowLeft size={18} /> Batal</button>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h2 className="serif" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 600 }}>{initial ? "Ubah Catatan Fiqh" : "Tambah Catatan Fiqh"}</h2>
        <Grid>
          <div>
            <Label>Kategori</Label>
            <select className="field" style={inputStyle} value={f.kategori} onChange={(e) => set("kategori", e.target.value)}>
              <option value="">— tanpa kategori —</option>
              {kategori.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <Label req>Judul</Label>
            <input className="field" style={inputStyle} value={f.judul} onChange={(e) => set("judul", e.target.value)} placeholder="cth. Rukun Umroh" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Uraian hukum</Label>
            <textarea className="field" rows={6} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} value={f.isi} onChange={(e) => set("isi", e.target.value)} placeholder="Tulis penjelasan hukumnya di sini…" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Dalil</Label>
            <textarea className="field" rows={3} style={{ ...inputStyle, resize: "vertical" }} value={f.dalil} onChange={(e) => set("dalil", e.target.value)} placeholder="Ayat, hadis, atau kaidah yang menjadi dasar…" />
          </div>
          <div>
            <Label>Rujukan kitab</Label>
            <input className="field" style={inputStyle} value={f.rujukan} onChange={(e) => set("rujukan", e.target.value)} placeholder="cth. Fikih Manasik — mazhab Syafi'i" />
          </div>
          <div>
            <Label>Catatan pembimbing</Label>
            <input className="field" style={inputStyle} value={f.catatan} onChange={(e) => set("catatan", e.target.value)} placeholder="cth. sering ditanyakan jamaah" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Lampiran (tautan, opsional)</Label>
            <TautanBerkas nilai={f.berkas} onChange={(v) => set("berkas", v)} label="Tambah tautan rujukan"
              petunjuk="Bisa tautan kitab PDF, artikel, atau rekaman kajian dari Google Drive." />
          </div>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="btn" onClick={onCancel} style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "11px 20px", borderRadius: 12 }}>Batal</button>
          <button className="btn" disabled={!canSave} onClick={() => onSave(f)} style={{ background: canSave ? C.green : C.border, color: "#fff", padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "not-allowed" }}><Check size={18} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DARURAT — tombol panik
   ============================================================ */
function DaruratPage({ lokasi, tg, darurat, setDarurat, pengguna, periodeAktif, setLaporan }) {
  const [tahan, setTahan] = useState(0);        // 0..100
  const [proses, setProses] = useState(null);   // null | "jalan" | "selesai" | "gagal"
  const [pesanHasil, setPesanHasil] = useState([]);
  const [atur, setAtur] = useState(false);
  const timerRef = useRef(null);
  const mulaiRef = useRef(0);

  const kontak = darurat?.kontak || [];
  const utama = kontak[0] || null;
  const nama = pengguna?.email?.split("@")[0] || "Pembimbing";

  const LAMA_TAHAN = 1500; // ms

  const mulaiTahan = () => {
    if (proses === "jalan") return;
    mulaiRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const lewat = Date.now() - mulaiRef.current;
      const persen = Math.min(100, (lewat / LAMA_TAHAN) * 100);
      setTahan(persen);
      if (persen >= 100) { hentikanTahan(); kirimDarurat(); }
    }, 30);
  };
  const hentikanTahan = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setTahan(0);
  };
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const kirimDarurat = async () => {
    setProses("jalan");
    setPesanHasil([]);
    const hasil = [];
    let p = null;

    // 1. Ambil koordinat
    try {
      p = await lokasi.ambilSekali();
      hasil.push({ ok: true, teks: `Koordinat didapat (±${Math.round(p.akurasi)} m)` });
    } catch (e) {
      hasil.push({ ok: false, teks: "Koordinat gagal diambil: " + (e.message || "tidak diketahui") });
    }

    const waktuISO = new Date().toISOString();
    const barisLokasi = p
      ? `📍 Koordinat: ${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}\n🗺 Peta: ${mapsCari(p.lat, p.lng)}`
      : "📍 Koordinat tidak tersedia (GPS mati atau izin ditolak)";

    const isiPesan = [
      "🚨 <b>SINYAL DARURAT — KBIH IBNU AQIL</b>",
      "━━━━━━━━━━━━━━",
      periodeAktif ? `Periode: ${escHtml(periodeAktif.nama)}` : "",
      `Dikirim oleh: <b>${escHtml(nama)}</b>`,
      "",
      barisLokasi,
      "",
      `🕐 ${waktuLapWIB(waktuISO)} WIB · ${waktuLapAST(waktuISO)} AST`,
      "",
      "<i>Mohon segera dihubungi.</i>",
    ].filter(Boolean).join("\n");

    // 2. Kirim ke Telegram
    if (tg?.token && tg?.chatId) {
      try {
        await kirimTelegram(tg.token, tg.chatId, isiPesan);
        hasil.push({ ok: true, teks: "Pesan darurat terkirim ke grup Telegram" });
      } catch (e) {
        hasil.push({ ok: false, teks: "Telegram gagal: " + (e.message || "tidak diketahui") });
      }
    } else {
      hasil.push({ ok: false, teks: "Telegram belum diatur — buka halaman Laporan untuk mengaturnya" });
    }

    // 3. Catat ke riwayat laporan
    try {
      setLaporan((l) => [{
        id: Date.now(),
        jenis: "Darurat",
        judul: "Sinyal darurat ditekan",
        isi: [
          "Tombol darurat ditekan dari halaman Darurat.",
          p ? `Koordinat: ${p.lat.toFixed(6)}, ${p.lng.toFixed(6)} (±${Math.round(p.akurasi)} m)` : "Koordinat tidak tersedia.",
          p ? `Peta: ${mapsCari(p.lat, p.lng)}` : "",
        ].filter(Boolean).join("\n"),
        pencatat: nama,
        waktuISO,
        status: tg?.token && tg?.chatId ? "terkirim" : "lokal",
      }, ...l]);
      hasil.push({ ok: true, teks: "Tercatat di riwayat laporan" });
    } catch { /* abaikan */ }

    setPesanHasil(hasil);
    setProses(hasil.some((h) => !h.ok) ? "gagal" : "selesai");

    // 4. Buka WhatsApp pembimbing
    if (utama?.nomor) {
      const teksWA = [
        "🚨 DARURAT — KBIH Ibnu Aqil",
        `Dari: ${nama}`,
        p ? `Lokasi saya: ${mapsCari(p.lat, p.lng)}` : "Lokasi tidak tersedia.",
        "Mohon segera dihubungi.",
      ].join("\n");
      const tautan = `${waLink(utama.nomor)}?text=${encodeURIComponent(teksWA)}`;
      setTimeout(() => window.open(tautan, "_blank", "noopener"), 400);
    }
  };

  const siap = !!(tg?.token && tg?.chatId) || kontak.length > 0;

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600, color: C.danger }}>Tombol Darurat</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
          Tekan dan tahan tombol untuk mengirim lokasi Anda ke grup Telegram dan menghubungi pembimbing lewat WhatsApp.
        </p>
      </div>

      {!siap && (
        <div style={{ background: C.goldSoft, border: `1px solid ${C.gold}55`, borderRadius: 13, padding: "12px 14px", marginBottom: 18, fontSize: 12.5, color: C.goldDeep, display: "flex", gap: 8 }}>
          <AlertTriangle size={17} style={{ flexShrink: 0 }} />
          <span>Belum ada tujuan darurat. Atur nomor WhatsApp pembimbing di bawah, dan pastikan koneksi Telegram sudah diisi di halaman Laporan.</span>
        </div>
      )}

      {/* TOMBOL BESAR */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 22px" }}>
        <button
          onPointerDown={mulaiTahan}
          onPointerUp={hentikanTahan}
          onPointerLeave={hentikanTahan}
          onPointerCancel={hentikanTahan}
          onContextMenu={(e) => e.preventDefault()}
          disabled={proses === "jalan"}
          style={{
            width: 220, height: 220, borderRadius: "50%", border: "none", cursor: "pointer",
            position: "relative", overflow: "hidden", touchAction: "none", userSelect: "none",
            background: proses === "jalan"
              ? "#8c2f2f"
              : `radial-gradient(circle at 35% 30%, #d95252, ${C.danger} 60%, #8c2f2f 100%)`,
            boxShadow: `0 12px 34px rgba(178,59,59,.42), inset 0 -6px 14px rgba(0,0,0,.22)`,
            color: "#fff", fontFamily: "inherit",
            transform: tahan > 0 ? "scale(0.97)" : "scale(1)",
            transition: "transform .12s ease",
          }}>
          {/* isian saat ditahan */}
          <span style={{
            position: "absolute", left: 0, bottom: 0, width: "100%", height: `${tahan}%`,
            background: "rgba(255,255,255,.22)", transition: "height .03s linear",
          }} />
          <span style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {proses === "jalan"
              ? <Loader2 size={54} className="spin" />
              : <AlertOctagon size={54} />}
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: ".02em" }}>
              {proses === "jalan" ? "MENGIRIM…" : "DARURAT"}
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 600, opacity: .9 }}>
              {proses === "jalan" ? "mohon tunggu" : tahan > 0 ? "terus tahan…" : "tekan & tahan 1,5 detik"}
            </span>
          </span>
        </button>

        <div style={{ marginTop: 14, fontSize: 12.5, color: C.muted, textAlign: "center", maxWidth: 320 }}>
          {lokasi.pos
            ? <>Lokasi siap: {lokasi.pos.lat.toFixed(5)}, {lokasi.pos.lng.toFixed(5)} (±{Math.round(lokasi.pos.akurasi)} m)</>
            : <>Lokasi akan diambil saat tombol ditekan. Untuk lebih cepat, aktifkan lokasi di halaman <strong>Lokasi</strong>.</>}
        </div>
      </div>

      {/* HASIL PENGIRIMAN */}
      {pesanHasil.length > 0 && (
        <div style={{ background: C.surface, border: `1px solid ${proses === "gagal" ? C.danger + "55" : C.green + "44"}`, borderRadius: 16, padding: 16, marginBottom: 18 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 10, color: proses === "gagal" ? C.danger : C.green, display: "flex", alignItems: "center", gap: 7 }}>
            {proses === "gagal" ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
            {proses === "gagal" ? "Sebagian gagal dikirim" : "Sinyal darurat terkirim"}
          </div>
          {pesanHasil.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", fontSize: 12.5, color: h.ok ? C.ink : C.danger, marginBottom: 5 }}>
              {h.ok ? <Check size={14} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} /> : <X size={14} style={{ marginTop: 2, flexShrink: 0 }} />}
              {h.teks}
            </div>
          ))}
          {lokasi.pos && (
            <div style={{ display: "flex", gap: 7, marginTop: 12, flexWrap: "wrap" }}>
              <a href={mapsCari(lokasi.pos.lat, lokasi.pos.lng)} target="_blank" rel="noreferrer" className="btn"
                style={{ textDecoration: "none", background: C.greenSoft, color: C.green, padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                <MapIcon size={14} /> Buka lokasi saya di Peta
              </a>
              {utama?.nomor && (
                <a href={waLink(utama.nomor)} target="_blank" rel="noreferrer" className="btn"
                  style={{ textDecoration: "none", background: "#e4f4ea", color: "#1f9d55", padding: "8px 13px", borderRadius: 10, fontSize: 12.5 }}>
                  <MessageCircle size={14} /> Buka WhatsApp {utama.nama}
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* KONTAK DARURAT */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
        <button className="btn" onClick={() => setAtur((a) => !a)}
          style={{ width: "100%", justifyContent: "space-between", background: "transparent", padding: "14px 16px", borderRadius: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Phone size={17} color={kontak.length ? C.green : C.muted} />
            <span style={{ fontWeight: 700 }}>Kontak Darurat</span>
            <Badge bg={kontak.length ? C.greenSoft : C.bg} color={kontak.length ? C.green : C.muted}>
              {kontak.length ? `${kontak.length} kontak` : "Belum diatur"}
            </Badge>
          </span>
          <ChevronRight size={18} color={C.muted} style={{ transform: atur ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </button>

        {atur && (
          <div style={{ padding: "4px 16px 18px", borderTop: `1px solid ${C.border}` }}>
            <p style={{ margin: "12px 0 12px", fontSize: 12.5, color: C.muted }}>
              Kontak <strong>paling atas</strong> akan otomatis dibuka di WhatsApp saat tombol darurat ditekan. Gunakan tanda panah untuk mengubah urutan.
            </p>
            {kontak.map((k, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <button className="btn iconbtn" disabled={i === 0} title="Naik"
                    onClick={() => { const s = [...kontak]; [s[i - 1], s[i]] = [s[i], s[i - 1]]; setDarurat({ ...darurat, kontak: s }); }}
                    style={{ background: "transparent", color: i === 0 ? C.border : C.muted, padding: 1, borderRadius: 5 }}>
                    <ChevronRight size={13} style={{ transform: "rotate(-90deg)" }} />
                  </button>
                  <button className="btn iconbtn" disabled={i === kontak.length - 1} title="Turun"
                    onClick={() => { const s = [...kontak]; [s[i + 1], s[i]] = [s[i], s[i + 1]]; setDarurat({ ...darurat, kontak: s }); }}
                    style={{ background: "transparent", color: i === kontak.length - 1 ? C.border : C.muted, padding: 1, borderRadius: 5 }}>
                    <ChevronRight size={13} style={{ transform: "rotate(90deg)" }} />
                  </button>
                </div>
                <input className="field" style={{ ...inputStyle, flex: 1 }} value={k.nama} placeholder="Nama"
                  onChange={(e) => { const s = [...kontak]; s[i] = { ...s[i], nama: e.target.value }; setDarurat({ ...darurat, kontak: s }); }} />
                <input className="field" style={{ ...inputStyle, flex: 1 }} value={k.nomor} placeholder="08xx-xxxx-xxxx"
                  onChange={(e) => { const s = [...kontak]; s[i] = { ...s[i], nomor: e.target.value }; setDarurat({ ...darurat, kontak: s }); }} />
                <button className="btn iconbtn" title="Hapus"
                  onClick={() => setDarurat({ ...darurat, kontak: kontak.filter((_, j) => j !== i) })}
                  style={{ background: C.dangerSoft, color: C.danger, padding: 9, borderRadius: 10 }}><X size={15} /></button>
              </div>
            ))}
            <button className="btn" onClick={() => setDarurat({ ...darurat, kontak: [...kontak, { nama: "", nomor: "" }] })}
              style={{ background: C.greenSoft, color: C.green, padding: "9px 15px", borderRadius: 11, marginTop: 4 }}>
              <UserPlus size={16} /> Tambah Kontak
            </button>
          </div>
        )}
      </div>

      <div style={{ background: C.bg, borderRadius: 13, padding: "13px 15px", marginTop: 16, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        <strong style={{ color: C.ink }}>Yang terjadi saat tombol ditekan:</strong><br />
        1. Koordinat GPS diambil saat itu juga<br />
        2. Pesan berisi koordinat & tautan peta dikirim ke grup Telegram<br />
        3. Kejadian dicatat di riwayat laporan<br />
        4. WhatsApp kontak pertama terbuka dengan pesan siap kirim
      </div>
    </div>
  );
}

/* ============================================================
   KONTAK — daftar jamaah ringkas untuk menghubungi cepat
   ============================================================ */
function KontakPage({ list, bolehKelola = true }) {
  const [q, setQ] = useState("");
  const [rombongan, setRombongan] = useState("Semua");

  const daftarRombongan = useMemo(
    () => ["Semua", ...Array.from(new Set(list.map((j) => j.rombongan).filter(Boolean))).sort()],
    [list]
  );

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return list
      .filter((j) => {
        if (rombongan !== "Semua" && j.rombongan !== rombongan) return false;
        if (!s) return true;
        return [j.nama, j.telepon, j.rombongan].join(" ").toLowerCase().includes(s);
      })
      .sort((a, b) => (a.nama || "").localeCompare(b.nama || "", "id"));
  }, [list, q, rombongan]);

  const adaNomor = list.filter((j) => j.telepon).length;

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Kontak Jamaah</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
          {bolehKelola
            ? <>Daftar ringkas untuk menghubungi jamaah dengan cepat. {adaNomor} dari {list.length} jamaah punya nomor.</>
            : <>Daftar sesama jamaah dalam rombongan Anda. {list.length} orang terdaftar.</>}
        </p>
        {!bolehKelola && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.bg, color: C.muted, borderRadius: 9, padding: "6px 11px", fontSize: 11.5, marginTop: 9 }}>
            <Lock size={12} /> Hanya bisa dilihat — data pribadi jamaah lain tidak ditampilkan
          </div>
        )}
      </div>

      {/* pencarian & saringan */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 14, marginBottom: 14 }}>
        <div style={{ position: "relative", marginBottom: daftarRombongan.length > 1 ? 12 : 0 }}>
          <Search size={17} color={C.muted} style={{ position: "absolute", left: 13, top: 12 }} />
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama atau nomor…" style={{ ...inputStyle, paddingLeft: 40 }} />
          {q && <button className="btn iconbtn" onClick={() => setQ("")}
            style={{ position: "absolute", right: 8, top: 8, background: C.bg, padding: 6, borderRadius: 8 }}><X size={14} /></button>}
        </div>
        {daftarRombongan.length > 1 && (
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {daftarRombongan.map((r) => {
              const on = rombongan === r;
              return (
                <button key={r} className="btn" onClick={() => setRombongan(r)}
                  style={{ background: on ? C.green : C.bg, color: on ? "#fff" : C.muted, padding: "6px 13px", borderRadius: 99, fontSize: 12.5, border: `1px solid ${on ? C.green : C.border}` }}>
                  {r === "Semua" ? "Semua" : `Rombongan ${r}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {hasil.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "48px 20px", textAlign: "center", color: C.muted }}>
          <Phone size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Tidak ada jamaah yang cocok.</p>
        </div>
      ) : (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          {hasil.map((j, i) => (
            <div key={j.id}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
              }}>
              <Avatar foto={j.foto} nama={j.nama} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {j.nama}
                </div>
                <div style={{ fontSize: 12.5, color: j.telepon ? C.muted : C.border, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                  <Phone size={12} /> {j.telepon || "nomor belum diisi"}
                  {j.rombongan && <span style={{ color: C.green, fontWeight: 700 }}>· Rmb {j.rombongan}</span>}
                </div>
              </div>
              <ContactBtns tel={j.telepon} size={38} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PENGATURAN AKUN
   ============================================================ */
const PERAN = {
  Pembimbing: { warna: "#0f5c37", latar: "#e7f0ea", ikon: ShieldCheck, ket: "Akses penuh ke seluruh data" },
  Jamaah: { warna: "#2f7fa8", latar: "#e6f0f5", ikon: User, ket: "Melihat daftar jamaah & agenda, mengelola kartunya sendiri" },
};

function PengaturanPage({ pengguna, akunSaya, list = [], pid, periodeAktif }) {
  const [akun, setAkun, siapAkun] = useKoleksiTersinkron("akun", []);
  const [buat, setBuat] = useState(false);
  const [pesan, setPesan] = useState(null);

  const urut = [...akun].sort((a, b) => {
    if (a.aktif !== b.aktif) return a.aktif ? -1 : 1;
    return (a.nama || a.email || "").localeCompare(b.nama || b.email || "", "id");
  });

  const sayaTerdaftar = akun.some((a) => a.id === pengguna.uid);

  const daftarkanDiri = () => {
    setAkun((l) => [...l, {
      id: pengguna.uid,
      email: pengguna.email,
      nama: pengguna.email?.split("@")[0] || "Pembimbing",
      peran: "Pembimbing",
      aktif: true,
      dibuat: new Date().toISOString(),
      dibuatOleh: pengguna.email,
    }]);
    setPesan({ ok: true, teks: "Akun Anda sudah tercatat sebagai Pembimbing." });
  };

  const ubahAktif = (a) => {
    if (a.id === pengguna.uid) {
      alert("Anda tidak bisa menonaktifkan akun Anda sendiri.");
      return;
    }
    const jadi = !a.aktif;
    const tanya = jadi
      ? `Aktifkan kembali akun ${a.email}?`
      : `Nonaktifkan akun ${a.email}?\n\nOrang ini masih bisa masuk, tetapi tidak akan bisa membuka data apa pun.`;
    if (!window.confirm(tanya)) return;
    setAkun((l) => l.map((x) => (x.id === a.id ? { ...x, aktif: jadi } : x)));
    setPesan({ ok: true, teks: jadi ? `Akun ${a.email} diaktifkan kembali.` : `Akun ${a.email} dinonaktifkan.` });
  };

  // Satu akun hanya boleh untuk satu jamaah, dan sebaliknya
  const terpakai = useMemo(() => {
    const m = {};
    akun.forEach((a) => { if (a.jamaahId) m[String(a.jamaahId)] = a; });
    return m;
  }, [akun]);

  const hubungkanJamaah = (a, jamaahId) => {
    if (jamaahId && terpakai[jamaahId] && terpakai[jamaahId].id !== a.id) {
      alert(`Data jamaah itu sudah terhubung ke akun ${terpakai[jamaahId].email}.`);
      return;
    }
    setAkun((l) => l.map((x) => (x.id === a.id
      ? { ...x, jamaahId: jamaahId || null, periodeId: jamaahId ? pid : null }
      : x)));
    setPesan({ ok: true, teks: jamaahId
      ? `Akun ${a.email} dihubungkan ke data jamaah.`
      : `Tautan data jamaah pada ${a.email} dilepas.` });
  };

  const ubahPeran = (a, peran) => {
    if (a.id === pengguna.uid && peran === "Jamaah") {
      alert("Anda tidak bisa menurunkan peran akun Anda sendiri.");
      return;
    }
    setAkun((l) => l.map((x) => (x.id === a.id ? { ...x, peran } : x)));
  };

  const kirimReset = async (a) => {
    if (!window.confirm(`Kirim tautan atur ulang kata sandi ke ${a.email}?`)) return;
    try {
      await lupaSandi(a.email);
      setPesan({ ok: true, teks: `Tautan atur ulang kata sandi sudah dikirim ke ${a.email}.` });
    } catch (e) {
      setPesan({ ok: false, teks: "Gagal mengirim: " + pesanGalat(e) });
    }
  };

  const hapusDariDaftar = (a) => {
    if (a.id === pengguna.uid) { alert("Anda tidak bisa menghapus akun Anda sendiri."); return; }
    if (!window.confirm(
      `Hapus ${a.email} dari daftar?\n\nAkun akan kehilangan seluruh akses. Namun kredensial login-nya masih tersimpan di Firebase — untuk menghapus tuntas, buka Firebase Console → Authentication → Users.`
    )) return;
    setAkun((l) => l.filter((x) => x.id !== a.id));
    setPesan({ ok: true, teks: `${a.email} dihapus dari daftar. Aksesnya sudah dicabut.` });
  };

  return (
    <div className="fade">
      <div style={{ marginBottom: 16 }}>
        <h2 className="serif judul-hal" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Pengaturan Akun</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>Kelola siapa saja yang boleh membuka aplikasi ini.</p>
      </div>

      {/* Akun saya */}
      <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, borderRadius: 18, padding: 18, marginBottom: 18, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, flexWrap: "wrap" }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "#ffffff22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <UserCog size={23} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 11, color: "#b9cdc0", letterSpacing: ".05em", textTransform: "uppercase", fontWeight: 700 }}>Akun Anda</div>
            <div style={{ fontSize: 15.5, fontWeight: 700, marginTop: 2, wordBreak: "break-all" }}>{pengguna.email}</div>
            <div style={{ display: "flex", gap: 7, marginTop: 7, flexWrap: "wrap" }}>
              <Badge bg="#ffffff26" color="#fff" icon={ShieldCheck}>{akunSaya?.peran || "Pembimbing"}</Badge>
              {!sayaTerdaftar && <Badge bg="#ffffff26" color={C.goldSoft}>Belum tercatat di daftar</Badge>}
            </div>
          </div>
          <button className="btn" onClick={() => kirimReset({ email: pengguna.email })}
            style={{ background: "#ffffff22", color: "#fff", padding: "9px 14px", borderRadius: 11, fontSize: 12.5 }}>
            <KeyRound size={15} /> Ubah Kata Sandi
          </button>
        </div>
        {!sayaTerdaftar && (
          <div style={{ marginTop: 14, paddingTop: 13, borderTop: "1px solid #ffffff22", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "#d7e4da", flex: 1, minWidth: 200 }}>
              Akun Anda dibuat sebelum fitur ini ada, jadi belum tercatat. Catatkan agar muncul di daftar.
            </span>
            <button className="btn" onClick={daftarkanDiri}
              style={{ background: C.gold, color: "#3a2c05", padding: "8px 14px", borderRadius: 10, fontSize: 12.5 }}>
              <Plus size={15} /> Catatkan Akun Saya
            </button>
          </div>
        )}
      </div>

      {pesan && (
        <div style={{
          background: pesan.ok ? C.greenSoft : C.dangerSoft, color: pesan.ok ? C.green : C.danger,
          borderRadius: 12, padding: "11px 14px", marginBottom: 16, fontSize: 12.5,
          display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          {pesan.ok ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />}
          <span style={{ flex: 1 }}>{pesan.teks}</span>
          <button className="btn iconbtn" onClick={() => setPesan(null)} style={{ background: "transparent", padding: 2 }}><X size={14} /></button>
        </div>
      )}

      {/* Daftar akun */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>
          <Users size={16} /> Akun Terdaftar ({akun.length})
        </span>
        <button className="btn" onClick={() => setBuat(true)} style={{ background: C.green, color: "#fff", padding: "10px 18px", borderRadius: 12 }}>
          <UserPlus size={17} /> Tambah Akun
        </button>
      </div>

      {!siapAkun ? (
        <div style={{ textAlign: "center", padding: 40, color: C.muted, fontSize: 13 }}>
          <Loader2 size={20} className="spin" color={C.green} /><div style={{ marginTop: 8 }}>Memuat daftar akun…</div>
        </div>
      ) : urut.length === 0 ? (
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 16, padding: "44px 20px", textAlign: "center", color: C.muted }}>
          <UserCog size={32} color={C.border} />
          <p style={{ marginTop: 12, fontWeight: 600 }}>Belum ada akun tercatat.</p>
          <p style={{ margin: "4px 0 0", fontSize: 13 }}>Tekan "Tambah Akun" untuk membuatkan akun pembimbing atau jamaah.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {urut.map((a) => {
            const P = PERAN[a.peran] || PERAN.Pembimbing;
            const sayaSendiri = a.id === pengguna.uid;
            return (
              <div key={a.id} style={{
                background: C.surface, border: `1px solid ${a.aktif ? C.border : C.danger + "44"}`,
                borderRadius: 16, padding: 15, opacity: a.aktif ? 1 : .75,
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: a.aktif ? P.latar : C.dangerSoft, color: a.aktif ? P.warna : C.danger,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {a.aktif ? <P.ikon size={20} /> : <ShieldOff size={20} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                      {a.nama || "(tanpa nama)"}
                      {sayaSendiri && <Badge bg={C.greenSoft} color={C.green}>Anda</Badge>}
                      {!a.aktif && <Badge bg={C.dangerSoft} color={C.danger} icon={CircleSlash}>Nonaktif</Badge>}
                    </div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3, display: "flex", alignItems: "center", gap: 5, wordBreak: "break-all" }}>
                      <Mail size={12} /> {a.email}
                    </div>
                    <div style={{ fontSize: 11.5, color: C.muted, marginTop: 4 }}>
                      {P.ket}{a.dibuat ? ` · dibuat ${tglRingkas(a.dibuat.slice(0, 10))}` : ""}
                    </div>
                  </div>
                  <select className="field" value={a.peran || "Pembimbing"} onChange={(e) => ubahPeran(a, e.target.value)}
                    disabled={sayaSendiri}
                    style={{ ...inputStyle, width: "auto", padding: "7px 10px", fontSize: 12.5, opacity: sayaSendiri ? .6 : 1 }}>
                    <option>Pembimbing</option>
                    <option>Jamaah</option>
                  </select>
                </div>

                {a.peran === "Jamaah" && (
                  <div style={{ marginTop: 12, background: C.bg, borderRadius: 11, padding: "11px 13px" }}>
                    <div style={{ fontSize: 11.5, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7, display: "flex", alignItems: "center", gap: 6 }}>
                      <ContactRound size={13} /> Terhubung ke data jamaah
                    </div>
                    <select className="field" value={a.jamaahId ? String(a.jamaahId) : ""}
                      onChange={(e) => hubungkanJamaah(a, e.target.value)}
                      style={{ ...inputStyle, fontSize: 13 }}>
                      <option value="">— belum dihubungkan —</option>
                      {list.map((j) => {
                        const dipakaiOrangLain = terpakai[String(j.id)] && terpakai[String(j.id)].id !== a.id;
                        return (
                          <option key={j.id} value={String(j.id)} disabled={dipakaiOrangLain}>
                            {j.nama}{j.rombongan ? ` — Rmb ${j.rombongan}` : ""}{dipakaiOrangLain ? " (sudah dipakai)" : ""}
                          </option>
                        );
                      })}
                    </select>
                    {a.jamaahId && a.periodeId && String(a.periodeId) !== String(pid) && (
                      <div style={{ fontSize: 11.5, color: C.goldDeep, marginTop: 6, display: "flex", gap: 5 }}>
                        <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                        Terhubung ke periode lain — pilih ulang bila ingin memindahkannya ke periode ini.
                      </div>
                    )}
                    {!a.jamaahId && (
                      <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>
                        Selama belum dihubungkan, jamaah tidak bisa membuka Kartu Saya.
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: 7, marginTop: 13, paddingTop: 12, borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
                  <button className="btn" onClick={() => kirimReset(a)}
                    style={{ background: C.goldSoft, color: C.goldDeep, padding: "7px 12px", borderRadius: 9, fontSize: 12.5 }}>
                    <KeyRound size={14} /> Reset Kata Sandi
                  </button>
                  <button className="btn" onClick={() => ubahAktif(a)} disabled={sayaSendiri}
                    style={{
                      background: a.aktif ? C.bg : C.greenSoft, color: sayaSendiri ? C.border : (a.aktif ? C.muted : C.green),
                      border: `1px solid ${C.border}`, padding: "7px 12px", borderRadius: 9, fontSize: 12.5,
                      cursor: sayaSendiri ? "not-allowed" : "pointer",
                    }}>
                    {a.aktif ? <><ShieldOff size={14} /> Nonaktifkan</> : <><ShieldCheck size={14} /> Aktifkan</>}
                  </button>
                  <button className="btn" onClick={() => hapusDariDaftar(a)} disabled={sayaSendiri}
                    style={{
                      marginLeft: "auto", background: C.dangerSoft, color: sayaSendiri ? C.border : C.danger,
                      padding: "7px 12px", borderRadius: 9, fontSize: 12.5,
                      cursor: sayaSendiri ? "not-allowed" : "pointer",
                    }}>
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Keterangan penting */}
      <div style={{ background: C.bg, borderRadius: 14, padding: "14px 16px", marginTop: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>
        <div style={{ fontWeight: 800, color: C.ink, marginBottom: 7, display: "flex", alignItems: "center", gap: 7 }}>
          <ShieldCheck size={15} color={C.green} /> Tentang penghapusan akun
        </div>
        Firebase tidak mengizinkan aplikasi web menghapus akun orang lain — itu hanya bisa lewat Firebase Console.
        Karena itu tombol <strong>Hapus</strong> dan <strong>Nonaktifkan</strong> di sini <strong>mencabut seluruh akses</strong>:
        orang tersebut masih bisa memasukkan kata sandinya, tetapi tidak akan bisa membuka data apa pun.
        <br /><br />
        Untuk menghapus kredensialnya sampai tuntas, buka <strong>Firebase Console → Authentication → Users</strong>,
        cari emailnya, lalu hapus dari sana.
      </div>

      {buat && (
        <BuatAkunModal
          onClose={() => setBuat(false)}
          sudahAda={akun.map((a) => (a.email || "").toLowerCase())}
          list={list} pid={pid} terpakai={terpakai} periodeAktif={periodeAktif}
          onBerhasil={(data) => {
            setAkun((l) => [...l, { ...data, dibuatOleh: pengguna.email }]);
            setBuat(false);
            setPesan({ ok: true, teks: `Akun ${data.email} berhasil dibuat sebagai ${data.peran}.` });
          }} />
      )}
    </div>
  );
}

function BuatAkunModal({ onClose, onBerhasil, sudahAda, list = [], pid, terpakai = {}, periodeAktif }) {
  const [f, setF] = useState({ nama: "", email: "", sandi: "", peran: "Jamaah", jamaahId: "" });
  const [sibuk, setSibuk] = useState(false);
  const [galat, setGalat] = useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const acakSandi = () => {
    const huruf = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let hasil = "";
    for (let i = 0; i < 10; i++) hasil += huruf[Math.floor(Math.random() * huruf.length)];
    set("sandi", hasil);
  };

  const kirim = async () => {
    setGalat("");
    if (!f.email.trim()) return setGalat("Email belum diisi.");
    if (sudahAda.includes(f.email.trim().toLowerCase())) return setGalat("Email itu sudah ada di daftar akun.");
    if (f.sandi.length < 6) return setGalat("Kata sandi minimal 6 karakter.");
    if (f.peran === "Jamaah" && f.jamaahId && terpakai[f.jamaahId]) {
      return setGalat("Data jamaah itu sudah terhubung ke akun lain.");
    }
    setSibuk(true);
    try {
      const { uid, email } = await buatAkunBaru(f.email, f.sandi);
      onBerhasil({
        id: uid, email, nama: f.nama.trim() || email.split("@")[0],
        peran: f.peran, aktif: true, dibuat: new Date().toISOString(),
        jamaahId: f.peran === "Jamaah" && f.jamaahId ? f.jamaahId : null,
        periodeId: f.peran === "Jamaah" && f.jamaahId ? pid : null,
      });
    } catch (e) {
      setGalat(pesanGalat(e));
    }
    setSibuk(false);
  };

  const P = PERAN[f.peran];

  return (
    <Modal onClose={sibuk ? () => {} : onClose} width={430}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
            <UserPlus size={18} color={C.green} /> Tambah Akun
          </h3>
          <button className="btn iconbtn" onClick={onClose} style={{ background: C.bg, padding: 7, borderRadius: 9 }}><X size={16} /></button>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 12.5, color: C.muted }}>
          Akun dibuat langsung tanpa membuat Anda keluar dari aplikasi.
        </p>

        <Label>Peran</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 6 }}>
          {Object.entries(PERAN).map(([k, v]) => {
            const on = f.peran === k;
            return (
              <button key={k} className="btn" onClick={() => set("peran", k)}
                style={{
                  justifyContent: "flex-start", padding: "10px 12px", borderRadius: 11, fontSize: 13,
                  background: on ? v.latar : "#fff", color: on ? v.warna : C.muted,
                  border: `1.5px solid ${on ? v.warna : C.border}`,
                }}>
                <v.ikon size={16} /> {k}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 14 }}>{P.ket}.</div>

        {f.peran === "Jamaah" && (
          <>
            <Label>Hubungkan ke data jamaah</Label>
            <select className="field" style={{ ...inputStyle, marginBottom: 6 }} value={f.jamaahId}
              onChange={(e) => {
                const id = e.target.value;
                const j = list.find((x) => String(x.id) === id);
                setF((s) => ({ ...s, jamaahId: id, nama: s.nama || (j?.nama || "") }));
              }}>
              <option value="">— pilih nanti —</option>
              {list.map((j) => {
                const dipakai = !!terpakai[String(j.id)];
                return (
                  <option key={j.id} value={String(j.id)} disabled={dipakai}>
                    {j.nama}{j.rombongan ? ` — Rmb ${j.rombongan}` : ""}{dipakai ? " (sudah dipakai)" : ""}
                  </option>
                );
              })}
            </select>
            <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 14 }}>
              Satu akun hanya untuk satu jamaah{periodeAktif ? `, pada periode ${periodeAktif.nama}` : ""}.
            </div>
          </>
        )}

        <Label>Nama</Label>
        <input className="field" style={{ ...inputStyle, marginBottom: 12 }} value={f.nama}
          onChange={(e) => set("nama", e.target.value)} placeholder="cth. Ustadz Fulan" />

        <Label req>Email</Label>
        <input className="field" type="email" style={{ ...inputStyle, marginBottom: 12 }} value={f.email}
          onChange={(e) => set("email", e.target.value)} placeholder="nama@email.com" autoComplete="off" />

        <Label req>Kata sandi sementara</Label>
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <input className="field" style={{ ...inputStyle, flex: 1 }} value={f.sandi}
            onChange={(e) => set("sandi", e.target.value)} placeholder="minimal 6 karakter" autoComplete="off" />
          <button className="btn" onClick={acakSandi}
            style={{ background: C.greenSoft, color: C.green, padding: "0 14px", borderRadius: 11, fontSize: 12.5 }}>Acak</button>
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 14 }}>
          Berikan kata sandi ini ke yang bersangkutan, lalu minta menggantinya lewat "Lupa kata sandi".
        </div>

        {galat && (
          <div style={{ background: C.dangerSoft, color: C.danger, borderRadius: 10, padding: "10px 12px", fontSize: 12.5, marginBottom: 14, display: "flex", gap: 7 }}>
            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {galat}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn" onClick={onClose} disabled={sibuk}
            style={{ background: "#fff", color: C.muted, border: `1px solid ${C.border}`, padding: "10px 18px", borderRadius: 11 }}>Batal</button>
          <button className="btn" onClick={kirim} disabled={sibuk}
            style={{ background: sibuk ? C.border : C.green, color: "#fff", padding: "10px 20px", borderRadius: 11 }}>
            {sibuk ? <Loader2 size={16} className="spin" /> : <Check size={16} />} {sibuk ? "Membuat…" : "Buat Akun"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================================================
   KARTU SAYA — halaman pribadi untuk akun jamaah
   ============================================================ */
function KartuSayaPage({ saya, simpan, siap, akunSaya, pengguna, tg, pid, periodeAktif }) {
  const [mode, setMode] = useState("kartu");   // kartu | profil
  const [tulis, setTulis] = useState(false);
  const [ubahCat, setUbahCat] = useState(null);
  const [kirim, setKirim] = useState(null);    // {ok, teks}

  if (!akunSaya?.jamaahId) {
    return (
      <div className="fade" style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "44px 22px", textAlign: "center" }}>
        <ContactRound size={34} color={C.border} />
        <p style={{ margin: "14px 0 4px", fontWeight: 700, fontSize: 15.5 }}>Akun belum terhubung ke data jamaah</p>
        <p style={{ margin: "0 auto", fontSize: 13, color: C.muted, maxWidth: 380, lineHeight: 1.6 }}>
          Mintalah pembimbing menghubungkan akun <strong>{pengguna.email}</strong> ke data jamaah Anda
          lewat halaman Pengaturan Akun.
        </p>
      </div>
    );
  }

  if (!siap) {
    return <div style={{ textAlign: "center", padding: 50, color: C.muted, fontSize: 13 }}>
      <Loader2 size={20} className="spin" color={C.green} /><div style={{ marginTop: 8 }}>Memuat data Anda…</div>
    </div>;
  }

  if (!saya) {
    return (
      <div className="fade" style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 18, padding: "44px 22px", textAlign: "center" }}>
        <AlertTriangle size={30} color={C.gold} />
        <p style={{ margin: "14px 0 4px", fontWeight: 700 }}>Data jamaah tidak ditemukan</p>
        <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Data mungkin sudah dipindahkan. Hubungi pembimbing Anda.</p>
      </div>
    );
  }

  const catatan = [...(saya.catatanHarian || [])].sort((a, b) => (b.waktuISO || "").localeCompare(a.waktuISO || ""));
  const terakhir = catatan[0];

  // Menyimpan catatan + mengirim ke Telegram + mencatat ke riwayat
  const simpanCatatan = async (c) => {
    const lama = saya.catatanHarian || [];
    const baru = c.id ? lama.map((x) => (x.id === c.id ? c : x)) : [...lama, { ...c, id: Date.now() }];
    await simpan({ catatanHarian: baru });
    setTulis(false); setUbahCat(null);

    if (c.id) return;   // hanya catatan baru yang dikirim

    const K = KONDISI[c.kondisi] || KONDISI.sehat;
    const pesan = [
      `📋 <b>CATATAN JAMAAH</b>`,
      "━━━━━━━━━━━━━━",
      periodeAktif ? `Periode: ${escHtml(periodeAktif.nama)}` : "",
      `Jamaah: <b>${escHtml(saya.nama || "-")}</b>${saya.rombongan ? ` (Rmb ${escHtml(saya.rombongan)})` : ""}`,
      `Kondisi: <b>${escHtml(K.label)}</b>`,
      "",
      c.isi ? escHtml(c.isi) : "",
      [c.suhu && `Suhu: ${escHtml(c.suhu)}`, c.tensi && `Tensi: ${escHtml(c.tensi)}`, c.obat && `Obat: ${escHtml(c.obat)}`].filter(Boolean).join(" · "),
      "",
      `🕐 ${waktuLapWIB(c.waktuISO)} WIB · ${waktuLapAST(c.waktuISO)} AST`,
      `<i>Dikirim sendiri oleh jamaah lewat aplikasi.</i>`,
    ].filter(Boolean).join("\n");

    const hasil = [];
    if (tg?.token && tg?.chatId) {
      try { await kirimTelegram(tg.token, tg.chatId, pesan); hasil.push("terkirim ke Telegram pembimbing"); }
      catch (e) { hasil.push("gagal kirim Telegram: " + (e.message || "")); }
    } else {
      hasil.push("Telegram belum diatur pembimbing");
    }

    try {
      await tambahDokumen(["periode", pid, "laporan"], {
        id: Date.now(),
        jenis: "Kondisi Jamaah",
        judul: `Catatan mandiri — ${saya.nama || "Jamaah"}`,
        isi: [
          `Kondisi: ${K.label}`,
          c.isi || "",
          [c.suhu && `Suhu ${c.suhu}`, c.tensi && `Tensi ${c.tensi}`, c.obat && `Obat: ${c.obat}`].filter(Boolean).join(" · "),
        ].filter(Boolean).join("\n"),
        pencatat: `${saya.nama || "Jamaah"} (mandiri)`,
        waktuISO: c.waktuISO,
        status: tg?.token && tg?.chatId ? "terkirim" : "lokal",
      });
      hasil.push("tercatat di riwayat pembimbing");
    } catch (e) {
      hasil.push("gagal mencatat di riwayat");
    }

    setKirim({ ok: !hasil.some((h) => h.startsWith("gagal")), teks: "Catatan tersimpan — " + hasil.join(", ") + "." });
  };

  if (mode === "profil") {
    return (
      <JamaahForm
        initial={saya}
        list={[]}
        onCancel={() => setMode("kartu")}
        onSave={async (data) => {
          // Catatan harian tidak ikut disunting dari form profil
          const { catatanHarian, ...sisanya } = data;
          await simpan({ ...sisanya, catatanHarian: saya.catatanHarian || [] });
          setMode("kartu");
        }} />
    );
  }

  const K = terakhir && KONDISI[terakhir.kondisi] ? KONDISI[terakhir.kondisi] : null;

  return (
    <div className="fade">
      {/* Kartu identitas */}
      <div style={{ background: `linear-gradient(125deg, ${C.greenDeep}, ${C.green})`, borderRadius: 20, padding: 20, color: "#fff", marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -26, top: -26, width: 120, height: 120, borderRadius: "50%", background: "#ffffff10" }} />
        <div style={{ display: "flex", gap: 15, alignItems: "center", position: "relative", flexWrap: "wrap" }}>
          <Avatar foto={saya.foto} nama={saya.nama} size={82} />
          <div style={{ flex: 1, minWidth: 170 }}>
            <div style={{ fontSize: 11, color: "#b9cdc0", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 700 }}>Kartu Jamaah</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700, marginTop: 3, lineHeight: 1.2 }}>{saya.nama || "—"}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {saya.rombongan && <Badge bg="#ffffff26" color="#fff" icon={Users}>Rombongan {saya.rombongan}</Badge>}
              {saya.usia && <Badge bg="#ffffff26" color="#fff">{saya.usia} tahun</Badge>}
              {periodeAktif && <Badge bg="#ffffff26" color={C.goldSoft} icon={Moon}>{periodeAktif.nama}</Badge>}
            </div>
          </div>
          <button className="btn" onClick={() => setMode("profil")}
            style={{ background: "#ffffff22", color: "#fff", padding: "10px 16px", borderRadius: 11, fontSize: 13 }}>
            <Pencil size={15} /> Ubah Profil
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 16, paddingTop: 15, borderTop: "1px solid #ffffff22" }}>
          <KartuInfo label="No. paspor" isi={saya.noPaspor} />
          <KartuInfo label="Telepon" isi={saya.telepon} />
          <KartuInfo label="Golongan darah" isi={saya.golDarah} />
          <KartuInfo label="Kontak keluarga" isi={saya.kontakDarurat} />
        </div>
      </div>

      {kirim && (
        <div style={{
          background: kirim.ok ? C.greenSoft : C.goldSoft, color: kirim.ok ? C.green : C.goldDeep,
          borderRadius: 12, padding: "11px 14px", marginBottom: 14, fontSize: 12.5, display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          {kirim.ok ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />}
          <span style={{ flex: 1 }}>{kirim.teks}</span>
          <button className="btn iconbtn" onClick={() => setKirim(null)} style={{ background: "transparent", padding: 2 }}><X size={14} /></button>
        </div>
      )}

      {/* Kondisi terakhir */}
      {K && (
        <div style={{ background: K.latar, borderRadius: 15, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center", borderLeft: `4px solid ${K.warna}` }}>
          <K.ikon size={22} color={K.warna} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: K.warna }}>Kondisi terakhir: {K.label}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
              {terakhir.tanggal ? tglRingkas(terakhir.tanggal) : "—"} · WIB {jamWIB(terakhir.waktuISO)} · AST {jamAST(terakhir.waktuISO)}
            </div>
          </div>
        </div>
      )}

      {/* Catatan harian */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <NotebookPen size={18} color={C.green} /> Catatan & Kondisi Saya
            </h3>
            <p style={{ margin: "3px 0 0", fontSize: 12.5, color: C.muted }}>
              Setiap catatan baru langsung diteruskan ke pembimbing.
            </p>
          </div>
          <button className="btn" onClick={() => { setUbahCat(null); setTulis(true); }}
            style={{ background: C.green, color: "#fff", padding: "9px 15px", borderRadius: 11, fontSize: 13 }}>
            <Plus size={16} /> Tambah Catatan
          </button>
        </div>

        <RiwayatCatatan j={saya}
          onUbah={(c) => { setUbahCat(c); setTulis(true); }}
          onHapus={async (id) => {
            if (!window.confirm("Hapus catatan ini?")) return;
            await simpan({ catatanHarian: (saya.catatanHarian || []).filter((c) => c.id !== id) });
          }} />
      </div>

      <div style={{ background: C.bg, borderRadius: 13, padding: "13px 15px", marginTop: 16, fontSize: 12.5, color: C.muted, lineHeight: 1.6, display: "flex", gap: 9 }}>
        <Send size={15} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>
          Catatan yang Anda kirim akan muncul di grup Telegram pembimbing dan tersimpan di riwayat laporan.
          Bila kondisi Anda mendesak, gunakan halaman <strong style={{ color: C.danger }}>Darurat</strong>.
        </span>
      </div>

      {tulis && (
        <CatatanHarianModal
          awal={ubahCat}
          namaPencatat={saya.nama || ""}
          onClose={() => { setTulis(false); setUbahCat(null); }}
          onSimpan={simpanCatatan} />
      )}
    </div>
  );
}

function KartuInfo({ label, isi }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "#b9cdc0", letterSpacing: ".05em", textTransform: "uppercase", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 3, wordBreak: "break-word" }}>{isi || "—"}</div>
    </div>
  );
}
